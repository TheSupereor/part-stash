import { Request, Response } from "express";
import CatalogItem from "../models/CatalogItem";

const createCatalogItem = async (req: Request, res: Response) => {
  try {
    const item = await CatalogItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({error: 'An error ocurred'})
  }
}

const getAllCatalogItems = async (req: Request, res: Response) => {
  try{
    const items = await CatalogItem.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({error: 'An error ocurred'})
  }
}

export {
  createCatalogItem,
  getAllCatalogItems
}