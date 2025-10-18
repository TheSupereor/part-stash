import express from "express";
import {
  createCatalogItem,
  getAllCatalogItems,
} from "../controllers/catalogController";

const router = express.Router();

router.post("/", createCatalogItem);

router.get('/', getAllCatalogItems);

export default router;