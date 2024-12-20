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
 *                 enum: [received, processing, packing, shipping, delivered]
 *               creationDate:
 *                 type: string
 *                 format: date-time
 *           example:
 *             orderId: 1
 *             userId: 1
 *             productIds: [9, 10]
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
router.post('/orders', async (req, res) => {
    const { orderId, userId, productDetails, status, creationDate } = req.body;

    if (
        !orderId ||
        !userId ||
        !productDetails ||
        !Array.isArray(productDetails) ||
        productDetails.some(
            (detail) => !detail.productId || !detail.quantity || detail.quantity <= 0
        ) ||
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

        const orderDetails = await Promise.all(
            productDetails.map(async ({ productId, quantity }: { productId: number; quantity: number }) => {
                const product = await productService.getProductById(productId);
                if (!product) {
                    throw new Error(`Product with id ${productId} not found`);
                }

                return new OrderDetail({
                    orderId,
                    productId,
                    quantity,
                });
            })
        );

        const order = new Order({
            id: orderId,
            user,
            status,
            creationDate: new Date(creationDate),
            orderDetails: orderDetails,
        });

        const createdOrder = await orderService.createOrder({
            id: order.getId(),
            user: {
                id: user.getId(),
                username: user.getUsername(),
                password: user.getPassword(),
                email: user.getEmail(),
                role: user.getRole(),
            },
            status: order.getStatus(),
            creationDate: order.getCreationDate(),
            orderDetail: order.getOrderDetails().map((detail) => ({
                id: detail.getId(),
                orderId: detail.getOrderId(),
                productId: detail.getProductId(),
                quantity: detail.getQuantity(),
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
router.get('/orders/:id', async (req, res) => {
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
