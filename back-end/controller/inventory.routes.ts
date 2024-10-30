import express from 'express';
import { InventoryService } from '../service/inventory.service';
import { Product } from '../model/product';

const router = express.Router();
const inventoryService = new InventoryService();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management API
 */

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Add new inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Inventory added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/inventory', async (req, res) => {
    const { productId, quantity } = req.body;
    if (productId == null || quantity == null) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    const product = new Product(productId, 'Sample Product', 'Sample Description', '0'); 
    const inventory = await inventoryService.addInventory(product, quantity);
    res.json(inventory);
});

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventories
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all inventories
 */
router.get('/inventory', async (req, res) => {
    const inventories = await inventoryService.getAllInventories();
    res.json(inventories);
});

/**
 * @swagger
 * /api/inventory:/update:
 *   patch:
 *     summary: Update inventory quantity
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch('/inventory/update', async (req, res) => {
    const { productId, quantity } = req.body;
    if (productId == null || quantity == null) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    const product = new Product(productId, 'Sample Product', 'Sample Description', '0');
    await inventoryService.updateInventoryQuantity(product, quantity);
    res.json({ message: 'Inventory updated successfully' });
});

/**
 * @swagger
 * /api/inventory:/{productId}:
 *   get:
 *     summary: Find inventory by product
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Inventory details
 *       404:
 *         description: Inventory not found
 */
router.get('/inventory/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = new Product(productId, 'Sample Product', 'Sample Description', '0'); 
    const inventory = await inventoryService.findInventoryByProduct(product);

    if (inventory) {
        res.json(inventory);
    } else {
        res.status(404).json({ message: 'Inventory not found' });
    }
});

export default router;
