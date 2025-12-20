import pika
import json
import os
import time
from sqlalchemy import create_engine, Column, Integer, String, JSON, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:////./audit.db")

Base = declarative_base()

class AuditLog(Base):
  __tablename__ = 'audit_logs'
  id = Column(Integer, primary_key=True, index=True)
  event_type = Column(String)
  payload = Column(JSON)
  created_at = Column(DateTime, default=datetime.now)
  
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

RABBITMQ_HOST = os.getenv('RABBIT_HOST', "localhost")
RABBITMQ_USER = os.getenv('RABBITMQ_DEFAULT_USER', "guest")
RABBITMQ_PASS = os.getenv("RABBITMQ_DEFAULT_PASS", "guest")

def connect_rabbit():
  credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASS)
  parameters = pika.ConnectionParameters(host=RABBITMQ_HOST, credentials=credentials)
  
  while True:
    try:
      connection = pika.BlockingConnection(parameters)
      return connection
    except pika.exceptions.AMQPConnectionError: # type: ignore
      print("Aguardando Rabbitmq")
      time.sleep(5)
    
def callback(ch, method, properties, body):
  """Função chamada ao chegar uma mensagem"""
  try:
    message = json.loads(body)
    print(f" [x] Recebido: {message['event']}")
    
    db = SessionLocal()
    log_entry = AuditLog(
      event_type = message['event'],
      payload = message['data'],
      created_at = datetime.fromisoformat(message['timestamp'].replace('Z', '+00:00')),
    )
    
    db.add(log_entry)
    db.commit()
    db.close()
    
    print('Salvo no banco de auditoria')
    
  except Exception as e:
    print(f" [!] Erro ao processar mensagem: {e}")

if __name__ == "__main__":
  print('Iniciando serviço de Auditoria')
  connection = connect_rabbit()
  channel = connection.channel()
  
  channel.queue_declare(queue='app_events', durable=True)
  channel.basic_consume(queue='app_events', on_message_callback=callback, auto_ack=True)
  
  print('Aguardando Mensagens...')
  channel.start_consuming()