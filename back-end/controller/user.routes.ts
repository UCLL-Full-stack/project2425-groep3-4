// user.routes.ts
import express from 'express';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/users', async (req, res) => {
    const { userId, username, password, role } = req.body;

    if (userId == null || !username || !password || !role) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const user = new User(userId, username, password, role);
    const createdUser = await userService.addUser(user);
    res.json(createdUser);
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/users', async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/users/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await userService.getUserById(userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

/**
 * @swagger
 * /api/users/{userId}:
 *   patch:
 *     summary: Update user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 nullable: true
 *               password:
 *                 type: string
 *                 nullable: true
 *               role:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.patch('/users/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const updatedUser: { username?: string; password?: string; role?: string } = req.body; 

    const user = await userService.updateUser(userId, updatedUser);
    if (user) {
        res.json({ message: 'User updated successfully', user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});



/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const deleted = await userService.deleteUser(userId);

    if (deleted) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

export default router;
