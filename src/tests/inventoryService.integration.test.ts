import InventoryService from '../services/InventoryService';
import InventoryItem from '../models/InventoryItem';
import setupTestDB from './database-test';
import { Sequelize } from 'sequelize';

describe('InventoryService - integração', () => {
  let sequelize: Sequelize;
  
  beforeAll(async () => {
    sequelize = await setupTestDB();
  });

  beforeEach(async () => {
    await InventoryItem.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('faz checkout com item real no banco', async () => {
    const item = await InventoryItem.create({
      id: 123,
      location: "Item Teste",
      quantity: 10,
    });

    const result = await InventoryService.checkoutItem(123, 5);

    expect(result.quantity).toBe(5);

    const updated = await InventoryItem.findByPk(123);
    if(!updated) throw Error('Item não encontrado');
    expect(updated.quantity).toBe(5);
  });

  it('retorna erro se o item não existe', async () => {
    await expect(
      InventoryService.checkoutItem(999, 5)
    ).rejects.toThrow('ITEM_NOT_FOUND');
  });

  it('retorna erro se estoque insuficiente', async () => {
    await InventoryItem.create({
      id: 123,
      location: "Item Teste",
      quantity: 3,
    });

    await expect(
      InventoryService.checkoutItem(123, 5)
    ).rejects.toThrow('INSUFFICIENT_STOCK');
  });
});
