/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Inventory:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            quantity:
 *              type: number
 *              format: int64
 *            product:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Product' 
 *      InventoryInput:
 *          type: object
 *          properties:
 *            quantity:
 *              type: number
 *              format: int64
 *      ProductInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            description: 
 *              type: string
 *            location:
 *              type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import inventoryService from '../service/inventory.service';
import { Product } from '../model/product';
import { InventoryInput, ProductInput } from '../types';

const inventoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Warehouse management API
 */

/**
 * @swagger
 * /api/inventory/create:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Adds a new inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryInput'
 *     responses:
 *       200:
 *         description: Inventory added successfully.
 *         content: 
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Inventory'
 *       400:
 *         description: Invalid input
 */
inventoryRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventory = await <InventoryInput>req.body;
        const result = await inventoryService.createInventory(inventory);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all inventories if admin, a list of all inventories
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
 *       500:
 *         description: Internal server error
 */
inventoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventories = await inventoryService.getAllInventory();
        res.status(200).json(inventories);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/inventory/update:
 *   patch:
 *     summary: Update inventory quantity
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryInput'
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Inventory'
 *       400:
 *         description: Invalid input
 */
inventoryRouter.patch('/update', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventory = await <InventoryInput>req.body;

        if (!inventory.id) {
            return res.status(400).json({ message: 'Inventory ID is required' });
        }

        const updatedInventory = await inventoryService.updateInventoryDetails({
            inventoryId: inventory.id,
            quantity: inventory.quantity,
            products: inventory.product,
        });

        if (!updatedInventory) {
            return res.status(404).json({ message: 'Inventory not found or update failed' });
        }

        res.json({
            message: 'Inventory updated successfully',
            updatedInventory,
        });
    } catch (error) {
       next(error) 
    }
});

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get inventory by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: Inventory ID
 *     responses:
 *       200:
 *         description: Inventory details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory not found
 */
inventoryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inventory = await inventoryService.getInventoryById(Number(req.params.id));
        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/inventory/product/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Find inventory by product ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: Product ID
 *     responses:
 *       200:
 *         description: Inventory details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: No inventory found for Product ID
 */
inventoryRouter.get('/product/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = parseInt(req.params.id, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ message: 'Invalid Product ID' });
        }

        const inventory = await inventoryService.getInventoryByProductId(Number(req.params.id));
        if (!inventory) {
            return res.status(404).json({ message: `No inventory found for Product ID ${productId}` });
        }

        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
});

export default { inventoryRouter };
