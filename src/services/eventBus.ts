import { Channel, connect } from "amqplib";

class EventBus {
  isConnected: boolean;
  channel: Channel | null;

  constructor() {
    this.channel = null;
    this.isConnected = false
  }

  async connect() {
    const rabbitUrl = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672"
    console.log('Inicializando Sistema de Mensageria...')
    try {
      const connection = await connect(rabbitUrl);
      this.channel = await connection.createChannel();

      await this.channel.assertQueue('app_events', { durable: true });

      this.isConnected = true;
      console.log('Conexão bem sucedida.');
    } catch (e) {
      console.error('Erro ao conectar ao RabbitMQ: ', JSON.stringify(e));
      setTimeout(() => this.connect(), 5000);
    }
  }

  publish(eventName: string, data: any) {
    if(!this.isConnected){
      console.error('RabbitMQ não conectado, mensagem perdida: ', eventName);
      return;
    }

    const message = {
      event: eventName,
      timestamp: new Date(),
      data: data,
    }

    this.channel?.sendToQueue('app_events', Buffer.from(JSON.stringify(message)));
    console.log(`Evento enviado: ${eventName}`);
  }
}

export default new EventBus;