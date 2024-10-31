// orderDetails.routes.ts
import express from 'express';
import { OrderDetailService } from '../service/orderDetail.service';
import { OrderDetail } from '../model/orderDetail';

const router = express.Router();
const orderDetailService = new OrderDetailService();

/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: Order details management API
 */

/**
 * @swagger
 * /api/orderDetails:
 *   post:
 *     summary: Add a new order detail
 *     tags: [OrderDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order detail added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/orderDetails', async (req, res) => {
    const { orderId, productId, quantity } = req.body;

    if (orderId == null || productId == null || quantity == null) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const orderDetail = new OrderDetail(orderId, productId, quantity);
    const createdOrderDetail = await orderDetailService.addOrderDetail(orderDetail);
    res.json(createdOrderDetail);
});

/**
 * @swagger
 * /api/orderDetails/{orderId}:
 *   get:
 *     summary: Get order details by order ID
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details found
 *       404:
 *         description: No order details found
 */
router.get('/orderDetails/:orderId', async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const orderDetails = await orderDetailService.getOrderDetailsByOrderId(orderId);

    if (orderDetails.length > 0) {
        res.json(orderDetails);
    } else {
        res.status(404).json({ message: 'No order details found' });
    }
});

/**
 * @swagger
 * /api/orderDetails/update:
 *   patch:
 *     summary: Update an order detail
 *     tags: [OrderDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order detail updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Order detail not found
 */
router.patch('/orderDetails/update', async (req, res) => {
    const { orderId, productId, quantity } = req.body;

    if (orderId == null || productId == null || quantity == null) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const updatedOrderDetail = await orderDetailService.updateOrderDetail(orderId, productId, quantity);
    if (updatedOrderDetail) {
        res.json({ message: 'Order detail updated successfully' });
    } else {
        res.status(404).json({ message: 'Order detail not found' });
    }
});

/**
 * @swagger
 * /api/orderDetails/{orderId}/{productId}:
 *   delete:
 *     summary: Delete an order detail
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Order detail deleted successfully
 *       404:
 *         description: Order detail not found
 */
router.delete('/orderDetails/:orderId/:productId', async (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const productId = parseInt(req.params.productId);

    const deleted = await orderDetailService.deleteOrderDetail(orderId, productId);

    if (deleted) {
        res.json({ message: 'Order detail deleted successfully' });
    } else {
        res.status(404).json({ message: 'Order detail not found' });
    }
});

export default router;
