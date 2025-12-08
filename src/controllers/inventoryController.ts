import { Request, Response } from "express";
import InventoryItem from "../models/InventoryItem";
import CatalogItem from "../models/CatalogItem";
import InventoryService from "../services/InventoryService";

interface errorRes {
  message: string
}

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
    const { inventoryId } = req.params;
    const { quantityToCheckout } = req.body;

    const updatedItem = await InventoryService.checkoutItem(Number(inventoryId), quantityToCheckout);

    res.status(200).json(updatedItem);
  } catch (error: unknown) {
    const errorMessage = error as errorRes;
    if (errorMessage.message === 'ITEM_NOT_FOUND') {
      return res.status(404).json({ error: 'Item não encontrado no inventário' });
    }
    if (errorMessage.message === 'INSUFFICIENT_STOCK') {
      return res.status(400).json({ error: 'Estoque insuficiente' });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export {
  addInventoryItem,
  getAllInventory,
  checkoutInventoryItem
}