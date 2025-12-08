import { Sequelize } from 'sequelize';
import InventoryItem from '../models/InventoryItem';


async function setupTestDB() {
  // Cria o banco em memória
  const sequelize = new Sequelize('sqlite::memory:', {
    logging: false, // sem logs no terminal
  });

  // Recarrega o model conectado ao novo Sequelize
  InventoryItem.init(InventoryItem.getAttributes(), {
    sequelize,
    modelName: 'InventoryItem',
  });

  // Cria tabelas
  await sequelize.sync({ force: true });

  return sequelize;
}

export default setupTestDB;
