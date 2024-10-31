// order.routes.ts
import express from 'express';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order';
import { User } from '../model/user';
import { Product } from '../model/product';

const router = express.Router();
const orderService = new OrderService();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               status:
 *                 type: string
 *               creationDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/orders', async (req, res) => {
    const { orderId, userId, productIds, status, creationDate } = req.body;

    if (orderId == null || userId == null || !productIds || !Array.isArray(productIds) || status == null || creationDate == null) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const user = new User(userId, '', '', '',);   // TODO:
    const products = productIds.map((id: number) => new Product(id, 'Sample Product', 'Sample Description', '0')); 

    const order = new Order(orderId, user, products, status, new Date(creationDate));
    const createdOrder = await orderService.createOrder(order);
    res.json(createdOrder);
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get('/orders', async (req, res) => {
    const orders = await orderService.getAllOrders();
    res.json(orders);
});

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get('/orders/:orderId', async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const order = await orderService.getOrderById(orderId);

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Order not found
 */
router.patch('/orders/:orderId/status', async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;

    if (status == null) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    if (updatedOrder) {
        res.json({ message: 'Order status updated successfully' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     summary: Delete order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/orders/:orderId', async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const deleted = await orderService.deleteOrder(orderId);

    if (deleted) {
        res.json({ message: 'Order deleted successfully' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

export default router;
