import InventoryItem from '../models/InventoryItem';

class InventoryService {
  // Note que não recebemos req e res, apenas os DADOS necessários
  async checkoutItem(inventoryId: number, quantityToCheckout: number) {
    const item = await InventoryItem.findByPk(inventoryId);

    if (!item) {
      throw new Error('ITEM_NOT_FOUND'); 
    }

    if (item.quantity < quantityToCheckout) {
      throw new Error('INSUFFICIENT_STOCK');
    }

    item.quantity -= quantityToCheckout;
    await item.save();

    return item;
  }
}

export default new InventoryService();