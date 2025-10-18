import express from 'express';
import { addInventoryItem, checkoutInventoryItem, getAllInventory } from '../controllers/inventoryController';


const router = express.Router();

router.post('/', addInventoryItem);
router.get('/', getAllInventory);
router.put('/:invetoryId/checkout', checkoutInventoryItem);

export default router;