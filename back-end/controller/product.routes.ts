import express from 'express';
import productService from '../service/product.service';
import { Product } from '../model/product';

const router = express.Router();

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
 *     security:
 *          - bearerAuth: []
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
router.post('/', async (req, res) => {
    const { name, description, location } = req.body;

    if (!name || !description || !location) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        const createdProduct = await productService.createProduct({ name, description, location });
        res.json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' + error });
    }
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     security:
 *          - bearerAuth: []
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving products', error: error });
    }
});
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     security:
 *          - bearerAuth: []
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
router.get('/:id', async (req, res) => {
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
 *     security:
 *          - bearerAuth: []
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

router.patch('/:id', async (req, res) => {
    const { id } = req.params; 
    const { name, description, location } = req.body;

    if (!id || !name || !description || !location) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        const product = new Product({
            id: Number(id), 
            name,
            description,
            location
        });

        const updatedProduct = await productService.updateProduct(product);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product: ' + error });
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     security:
 *          - bearerAuth: []
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
router.delete('/:id', async (req, res) => {
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
