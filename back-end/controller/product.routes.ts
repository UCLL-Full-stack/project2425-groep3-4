import express from 'express';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { PrismaProductRepository } from '../repository/product.db';

const router = express.Router();
const productRepository = new PrismaProductRepository(); 
const productService = new ProductService(productRepository); 

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
    const { name, description, location } = req.body;

    if (!name || !description || !location) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        const product = new Product({ name, description, location });
        const createdProduct = await productService.addProduct(product);
        res.json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' + error });
    }
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
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error });
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
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
router.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const product = await productService.getProductById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error });
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product details
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
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
router.patch('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;

    try {
        const product = await productService.updateProduct(id, updatedProduct);
        if (product) {
            res.json({ message: 'Product updated successfully', product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error });
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
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
router.delete('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await productService.deleteProduct(id);
        if (deleted) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error });
    }
});

export default router;
