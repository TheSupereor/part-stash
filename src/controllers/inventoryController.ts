import { Request, Response } from "express";
import InventoryService from "../services/InventoryService";

interface errorRes {
  message: string
}

const addInventoryItem = async (req: Request, res: Response) => {
  try {
    const { catalogItemId, location, quantity } = req.body;
    const inventoryItem = InventoryService.addItem(catalogItemId, location, quantity);
    res.status(201).json(inventoryItem);
  } catch (error) {
    const errorMessage = error as errorRes;
    console.error("Erro ao adicionar item:", JSON.stringify(error));
    if (errorMessage.message === 'CATALOG_ITEM_NOT_FOUND') {
      return res.status(404).json({ error: 'Item correspondente não encontrado no catálogo' });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getAllInventory = async (req: Request, res: Response) => {
  try {
    const items = await InventoryService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: "an error ocurred" });
  }
};

const checkoutInventoryItem = async (req: Request, res: Response) => {
  try {
    const { inventoryId } = req.params;
    const { quantityToCheckout } = req.body;

    const updatedItem = await InventoryService.checkoutItem(parseInt(inventoryId), quantityToCheckout);

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