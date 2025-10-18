import CatalogItem from "../models/CatalogItem";
import { Request, Response } from "express";
import InventoryItem from "../models/InventoryItem";

const addInventoryItem = async (req: Request, res: Response) => {
  try {
    const { catalogItemId, location, quantity } = req.body;

    const catalogItem = await CatalogItem.findByPk(catalogItemId);
    if (!catalogItem)
      return res.status(204).json({ error: "catalog item not found" });

    const inventoryItem = await InventoryItem.create({
      catalogItemId,
      location,
      quantity,
    });

    res.status(201).json(inventoryItem);
  } catch (error) {
    res.status(400).json({ error: "an error ocurred" });
  }
};

const getAllInventory = async (req: Request, res: Response) => {
  try {
    const items = await InventoryItem.findAll({
      include: CatalogItem, // join
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: "an error ocurred" });
  }
};

const checkoutInventoryItem = async (req: Request, res: Response) => {
  try {
    const { invetoryId } = req.params;
    const { quantityToCheckout } = req.body;

    const item = await InventoryItem.findByPk(invetoryId);
    if (!item) return res.status(204).json({ error: "item not found" });
    if ((item as any).quantity < quantityToCheckout) res.status(400).json({ error: "not enough stock" });

    (item as any).quantity -= quantityToCheckout;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({error: "an error ocurred"})
  }
};

export {
  addInventoryItem,
  getAllInventory,
  checkoutInventoryItem
}