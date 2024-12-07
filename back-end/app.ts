// app.ts
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// import inventoryRoutes from './controller/inventory.routes';
// import orderRoutes from './controller/order.routes';
// import orderDetailRoutes from './controller/orderDetail.routes';
import productRoutes from './controller/product.routes';
// import shipmentRoutes from './controller/shipment.routes';
// import userRoutes from './controller/user.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cors({
    origin:  ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

// Swagger options and configuration
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
// app.use('/api', orderRoutes);
// app.use('/api', orderDetailRoutes);
app.use('/api', productRoutes);
// app.use('/api', shipmentRoutes);
// app.use('/api', userRoutes);        // Check completed

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
