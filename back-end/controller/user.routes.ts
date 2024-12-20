/**
 * @swagger
 *  components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * 
 *   schemas:
 *      User:
 *          type: object
 *          properties:
 *              id: 
 *                  type: number
 *                  format: int64
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *      UserInput:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *              role:
 *                  type: string
 * 
 *      AuthenticationRequest:
 *          type: object
 *          properties: 
 *                  username: 
 *                      type: string
 *                  password: 
 *                      type: string
 * 
 *      AuthenticationResponse:
 *          type: object
 *          properties: 
 *                  username: 
 *                      type: string
 *                  password: 
 *                      type: string
 */

import userService from '../service/user.service';
import { User } from '../model/user';
import { UserInput } from '../types';
import express, { Response, Request, NextFunction } from 'express';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     security:
 *          - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUser();
        res.status(200).json(users);
        
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     security:
 *          - bearerAuth: []
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id  
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const uid = parseInt(req.params.id);
        const user = await userService.getUserById(uid);
        res.status(200).json(user)
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /api/users/signup:
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
 *               username:
 *                 type: string
 *               email:            
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
 *       409:
 *         description: User already exists
 */
router.post('/signup', async (req: Request, res: Response, next :NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput); 
        res.status(200).json(user);
        
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/users/login:
 *  post:
 *      summary: Log in using email and password. Returns an object with JWT token and username/email when successful.
 *      requestBody:
 *          required: true
 *          content:    
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AuthenticationRequest'      
 *      responses:
 *          200:
 *              description: The created user object
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticationResponse'
 */
router.post('/login', async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({message: "Authentication successfull", ...response});
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/users/{id}:
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
router.delete('/:id', async (req: Request, res: Response, next :NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const deleted = await userService.deleteUser(userId);
        res.status(200).json(deleted);
    } catch (error) {
        next(error);
    }
});

export default router;
// /**
//  * @swagger
//  * /api/users/{userId}:
//  *   patch:
//  *     summary: Update user details
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: User ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *                 nullable: true
//  *               password:
//  *                 type: string
//  *                 nullable: true
//  *               role:
//  *                 type: string
//  *                 nullable: true
//  *     responses:
//  *       200:
//  *         description: User updated successfully
//  *       404:
//  *         description: User not found
//  */
// router.patch('/users/:userId', async (req: Request, res: Response, next :NextFunction) => {
//     const userId = parseInt(req.params.userId);
//     const updatedUser: { username?: string; password?: string; role?: string } = req.body; 

//     const user = await userService.updateUser(userId, updatedUser);
//     if (user) {
//         res.json({ message: 'User updated successfully', user });
//     } else {
//         res.status(404).json({ message: 'User not found' });
//     }
// });

