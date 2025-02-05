const route = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Temple API',
        description: 'API documentation for the Temple API',
    },
    host: 'localhost:3000',
    schemes: ['https', 'http'],
};

// const outputFile = require('../swagger-output.json');
const endpointsFiles = ['./routes/index.js']; // Ensure this file contains your route definitions
route.use('/api-docs', swaggerUi.serve);
route.get('/api-docs', swaggerUi.setup(swaggerDocument));



// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log('Swagger documentation generated');
});

module.exports = route;