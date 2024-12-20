import express, { NextFunction, Request, Response } from 'express';
import inventoryService from '../service/inventory.service';
import { InventoryInput } from '../types';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Inventory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Inventory ID
 *         details:
 *           type: array
 *           description: List of inventory details
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: Product ID
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *     InventoryInput:
 *       type: object
 *       properties:
 *         details:
 *           type: array
 *           description: List of inventory details to add
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: Product ID
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 */

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management API
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventories
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all inventories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Inventory'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventories = await inventoryService.getAllInventories();
        res.status(200).json(inventories);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get inventory by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Inventory ID
 *     responses:
 *       200:
 *         description: Inventory details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory not found
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Inventory ID' });
        }

        const inventory = await inventoryService.getInventoryById(id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create a new inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryInput'
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventoryInput: InventoryInput = req.body;
        const newInventory = await inventoryService.createInventory(inventoryInput);
        res.status(201).json(newInventory);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete inventory by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Inventory ID
 *     responses:
 *       200:
 *         description: Inventory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory not found
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid Inventory ID' });
        }

        const deletedInventory = await inventoryService.deleteInventory(id);
        res.status(200).json(deletedInventory);
    } catch (error) {
        next(error);
    }
});

export default router;
