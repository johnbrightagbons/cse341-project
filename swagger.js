const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Temple API',
        description: 'API documentation for the Temple API',
    },
    host: 'localhost:3000',
    schemes: ['https', 'http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js']; // Ensure this file contains your route definitions

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log('Swagger documentation generated');
});
