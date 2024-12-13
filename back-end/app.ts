// app.ts
import * as dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
// import inventoryRoutes from './controller/inventory.routes';
import orderRoutes from './controller/order.routes';
import orderDetailRoutes from './controller/orderDetail.routes';
import productRoutes from './controller/product.routes';
// import shipmentRoutes from './controller/shipment.routes';
// import userRoutes from './controller/user.routes';

const app = express();
app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            // Allow connections to own server and the external API
            connectSrc: ["'self'", 'https://api.ucll.be'],
        },
    })
);

dotenv.config();
const port = process.env.APP_PORT || 3000;



app.use(cors());
app.use(bodyParser.json());
app.use(cors({
    origin:  ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status',  /^\/api\/products\/?.*/, /^\/api\/orders\/?.*/, ],
    })
);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple WMS API',
            version: '1.0.0',
            description: 'API documentation for Simple WMS'
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check route
app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

// Integrate inventory routes
// app.use('/api', inventoryRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderDetailRoutes);
app.use('/api', productRoutes);
// app.use('/api', shipmentRoutes);
// app.use('/api', userRoutes);        // Check completed

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
