// app.ts
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import inventoryRoutes from './controller/inventory.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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
app.use('/api', inventoryRoutes);

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
