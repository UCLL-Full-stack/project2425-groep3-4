// order.routes.ts
import express from 'express';
import orderService from '../service/order.service';
import userService  from '../service/user.service';
import productService  from '../service/product.service';
import { Order } from '../model/order';
import { OrderDetail } from '../model/orderDetail';
import { User } from '../model/user';
import { Product } from '../model/product';
import { OrderInput } from '../types';

const router = express.Router();


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
 *               userId:
 *                 type: integer
 *               productDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *               status:
 *                 type: string
 *                 enum: [received, processing, packing, shipping, delivered]
 *               creationDate:
 *                 type: string
 *                 format: date-time
 *           example:
 *             userId: 1
 *             productDetails: [
 *               { "productId": 1, "quantity": 2 },
 *               { "productId": 2, "quantity": 3 }
 *             ]
 *             status: "received"
 *             creationDate: "2024-12-10T20:52:22.843Z"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
    const { userId, productDetails, status, creationDate } = req.body;

    if (
        !userId ||
        !productDetails ||
        !Array.isArray(productDetails) ||
        productDetails.some((detail) => !detail.productId || !detail.quantity || detail.quantity <= 0) ||
        !status ||
        !creationDate
    ) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: `User with id ${userId} not found` });
        }

        const createdOrder = await orderService.createOrder({
            user: {
                id: user.getId(),
                username: user.getUsername(),
                password: user.getPassword(),
                email: user.getEmail(),
                role: user.getRole(),
            },
            status,
            creationDate: new Date(creationDate),
            orderDetail: productDetails.map(({ productId, quantity }) => ({
                productId,
                quantity,
                orderId: 0, 
            })),
        });

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'An error occurred while creating the order.' });
    }
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
router.get('/', async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error: error });
    }
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
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const order = await orderService.getOrderById({id});

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// /**
//  * @swagger
//  * /api/orders/{orderId}/status:
//  *   patch:
//  *     summary: Update order status
//  *     tags: [Orders]
//  *     parameters:
//  *       - in: path
//  *         name: orderId
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: Order ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               status:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Order status updated successfully
//  *       400:
//  *         description: Invalid input
//  *       404:
//  *         description: Order not found
//  */
// router.patch('/orders/:id/status', async (req, res) => {
//     const id = parseInt(req.params.id);
//     const { status } = req.body;

//     if (status == null) {
//         return res.status(400).json({ message: 'Invalid input' });
//     }

//     const updatedOrder = await orderService.updateOrderStatus(id, status);
//     if (updatedOrder) {
//         res.json({ message: 'Order status updated successfully' });
//     } else {
//         res.status(404).json({ message: 'Order not found' });
//     }
// });

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
