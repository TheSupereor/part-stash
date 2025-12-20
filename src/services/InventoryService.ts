import { CatalogItem } from "../models/CatalogItem";
import { InventoryItem } from "../models/InventoryItem";
import eventBus from "./eventBus";

class InventoryService {
  async addItem(catalogItemId: number, location: string, quantity: number) {
    const catalogItem = await CatalogItem.findByPk(catalogItemId);
    if (!catalogItem) throw new Error("CATALOG_ITEM_NOT_FOUND");

    const inventoryItem = await InventoryItem.create({
      catalogItemId,
      location,
      quantity,
    });

    return inventoryItem;
  }

  async checkoutItem(inventoryId: number, quantityToCheckout: number) {
    const item = await InventoryItem.findByPk(inventoryId);

    if (!item) {
      throw new Error("ITEM_NOT_FOUND");
    }

    if (item.quantity < quantityToCheckout) {
      throw new Error("INSUFFICIENT_STOCK");
    }

    item.quantity -= quantityToCheckout;
    await item.save();

    eventBus.publish('ITEM_CHECKOUT', {
      inventoryId: item.id,
      catalogItemId: item.catalogItemId,
      quantityRemoved: quantityToCheckout,
      remainingQuantity: item.quantity,
    });

    return item;
  }

  async getAllItems() {
    const items = await InventoryItem.findAll({
      include: CatalogItem,
    });

    return items;
  }
}

export default new InventoryService();
