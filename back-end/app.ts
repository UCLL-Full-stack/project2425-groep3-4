// app.ts
import * as dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

import inventoryRoutes from './controller/inventory.routes';
import orderRoutes from './controller/order.routes';
import orderDetailRoutes from './controller/orderDetail.routes';
import productRoutes from './controller/product.routes';
import userRoutes from './controller/user.routes';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware: Helmet for security
app.use(helmet());


//appUse
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ["'self'", 'https://api.ucll.be'],
        },
    })
);

// Middleware: Body parser and CORS
app.use(bodyParser.json());
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:8080'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Middleware: JWT authentication
app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/api-docs',
            /^\/api-docs\/.*/,
            '/status',
            '/api/users/login',
            '/api/users/signup',
            '/users/login',
            /^\/api\/products\/?.*/,
            /^\/api\/orders\/?.*/,
            /^\/api\/ordersDetails\/?.*/,
            /^\/api\/inventory\/?.*/
        ]
    })
);

// Route loading
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderDetails', orderDetailRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/status', (_req, res) => {
    res.json({ message: 'Back-end is running...' });
});

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple WMS API',
            version: '1.0.0',
            description: 'API documentation for Simple WMS',
        },
    },
    apis: ['./controller/*.routes.ts'], // Ensure this path matches your runtime environment
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Unified error handling middleware
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error(`[ERROR] ${err.message}`);
    console.error(err.stack);
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(500).json({ status: 'application error', message: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});

export default app;
