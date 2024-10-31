import express from 'express';
import { ShipmentService } from '../service/shipment.service';
import { Shipment } from '../model/shipment';
import { Order } from '../model/order';
import { User } from '../model/user';

const router = express.Router();
const shipmentService = new ShipmentService();

/**
 * @swagger
 * tags:
 *   name: Shipments
 *   description: Shipment management API
 */

/**
 * @swagger
 * /api/shipments:
 *   post:
 *     summary: Add a new shipment
 *     tags: [Shipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipmentId:
 *                 type: integer
 *               orderId:
 *                 type: integer
 *               status:
 *                 type: string
 *               shippedDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Shipment added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/shipments', async (req, res) => {
    const { shipmentId, orderId, status, shippedDate } = req.body;

    if (shipmentId == null || orderId == null || !status || !shippedDate) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const user = new User(1, '','','');
    const order = new Order(orderId, user, [], 'Pending', new Date()); 
    const shipment = new Shipment(shipmentId, order, status, new Date(shippedDate));
    const createdShipment = await shipmentService.addShipment(shipment);
    res.json(createdShipment);
});

/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Get all shipments
 *     tags: [Shipments]
 *     responses:
 *       200:
 *         description: List of all shipments
 */
router.get('/shipments', async (req, res) => {
    const shipments = await shipmentService.getAllShipments();
    res.json(shipments);
});

/**
 * @swagger
 * /api/shipments/{shipmentId}:
 *   get:
 *     summary: Get shipment by ID
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: shipmentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Shipment ID
 *     responses:
 *       200:
 *         description: Shipment details found
 *       404:
 *         description: Shipment not found
 */
router.get('/shipments/:shipmentId', async (req, res) => {
    const shipmentId = parseInt(req.params.shipmentId);
    const shipment = await shipmentService.getShipmentById(shipmentId);

    if (shipment) {
        res.json(shipment);
    } else {
        res.status(404).json({ message: 'Shipment not found' });
    }
});

/**
 * @swagger
 * /api/shipments/{shipmentId}:
 *   patch:
 *     summary: Update shipment status
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: shipmentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Shipment ID
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
 *         description: Shipment status updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Shipment not found
 */
router.patch('/shipments/:shipmentId', async (req, res) => {
    const shipmentId = parseInt(req.params.shipmentId);
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const updatedShipment = await shipmentService.updateShipmentStatus(shipmentId, status);
    if (updatedShipment) {
        res.json({ message: 'Shipment status updated successfully' });
    } else {
        res.status(404).json({ message: 'Shipment not found' });
    }
});

/**
 * @swagger
 * /api/shipments/{shipmentId}:
 *   delete:
 *     summary: Delete a shipment
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: shipmentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Shipment ID
 *     responses:
 *       200:
 *         description: Shipment deleted successfully
 *       404:
 *         description: Shipment not found
 */
router.delete('/shipments/:shipmentId', async (req, res) => {
    const shipmentId = parseInt(req.params.shipmentId);
    const deleted = await shipmentService.deleteShipment(shipmentId);

    if (deleted) {
        res.json({ message: 'Shipment deleted successfully' });
    } else {
        res.status(404).json({ message: 'Shipment not found' });
    }
});

export default router;
