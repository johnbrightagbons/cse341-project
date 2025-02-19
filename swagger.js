const express = require('express');
const route = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();

// Swagger documentation settings
const doc = {
    info: {
        title: 'My API',
        description: 'API documentation',
    },
    host: 'localhost:3000',
    schemes: ['http'],

};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts']; // Add all routes that should be documented

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('✅ Swagger documentation generated');
});

// Serve Swagger UI
const swaggerDocument = require(outputFile);
route.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = route;
