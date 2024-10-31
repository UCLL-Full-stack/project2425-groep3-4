import express from 'express';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

const router = express.Router();
const productService = new ProductService();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/products', async (req, res) => {
    const { productId, name, description, location } = req.body;

    if (productId == null || !name || !description || !location) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const product = new Product(productId, name, description, location);
    const createdProduct = await productService.addProduct(product);
    res.json(createdProduct);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get('/products', async (req, res) => {
    const products = await productService.getAllProducts();
    res.json(products);
});

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/products/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = await productService.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

/**
 * @swagger
 * /api/products/{productId}:
 *   patch:
 *     summary: Update product details
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.patch('/products/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId);
    const updatedProduct = req.body;

    const product = await productService.updateProduct(productId, updatedProduct);
    if (product) {
        res.json({ message: 'Product updated successfully', product });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/products/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId);
    const deleted = await productService.deleteProduct(productId);

    if (deleted) {
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

export default router;
