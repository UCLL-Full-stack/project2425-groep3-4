// orderDetails.routes.ts
import express from 'express';
import orderDetailService from '../service/orderDetail.service';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: Order details management API
 */

/**
 * @swagger
 * /api/orderDetails/{id}:
 *   get:
 *     summary: Get order details by order ID
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details found
 *       404:
 *         description: No order details found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        const orderDetails = await orderDetailService.getOrderDetailsByOrderId({ id });
        if (!orderDetails) {
            return res.status(404).json({ message: 'No order details found' });
        }

        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'An error occurred while fetching the order details.' });
    }
});


/**
 * @swagger
 * /api/orderDetails:
 *   post:
 *     summary: Add new order details
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *           example:
 *             orderId: 1
 *             details: [
 *               { productId: 1, quantity: 2 },
 *               { productId: 2, quantity: 3 }
 *             ]
 *     responses:
 *       201:
 *         description: Order details added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        const { orderId, details } = req.body;

        if (!orderId || !Array.isArray(details) || details.some(detail => !detail.productId || !detail.quantity)) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const createdOrderDetails = await orderDetailService.addOrderDetails(orderId, details);
        res.status(201).json(createdOrderDetails);
    } catch (error) {
        console.error('Error adding order details:', error);
        res.status(500).json({ message: 'An error occurred while adding the order details.' });
    }
});

export default router;



// /**
//  * @swagger
//  * /api/orderDetails/update:
//  *   patch:
//  *     summary: Update an order detail
//  *     tags: [OrderDetails]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               orderId:
//  *                 type: integer
//  *               productId:
//  *                 type: integer
//  *               quantity:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Order detail updated successfully
//  *       400:
//  *         description: Invalid input
//  *       404:
//  *         description: Order detail not found
//  */
// router.patch('/orderDetails/update', async (req, res) => {
//     const { orderId, productId, quantity } = req.body;

//     if (orderId == null || productId == null || quantity == null) {
//         return res.status(400).json({ message: 'Invalid input' });
//     }

//     const updatedOrderDetail = await orderDetailService.updateOrderDetail(orderId, productId, quantity);
//     if (updatedOrderDetail) {
//         res.json({ message: 'Order detail updated successfully' });
//     } else {
//         res.status(404).json({ message: 'Order detail not found' });
//     }
// });

// /**
//  * @swagger
//  * /api/orderDetails/{orderId}/{productId}:
//  *   delete:
//  *     summary: Delete an order detail
//  *     tags: [OrderDetails]
//  *     parameters:
//  *       - in: path
//  *         name: orderId
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: Order ID
//  *       - in: path
//  *         name: productId
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: Product ID
//  *     responses:
//  *       200:
//  *         description: Order detail deleted successfully
//  *       404:
//  *         description: Order detail not found
//  */
// router.delete('/orderDetails/:orderId/:productId', async (req, res) => {
//     const orderId = parseInt(req.params.orderId);
//     const productId = parseInt(req.params.productId);

//     const deleted = await orderDetailService.deleteOrderDetail(orderId, productId);

//     if (deleted) {
//         res.json({ message: 'Order detail deleted successfully' });
//     } else {
//         res.status(404).json({ message: 'Order detail not found' });
//     }
// });


