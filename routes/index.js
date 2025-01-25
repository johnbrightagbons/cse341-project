const express = require('express'); // Import express
const router = express.Router(); // Create router
const mongodb = require('../data/database'); // Import mongodb
const contactsRoutes = require('./contacts'); // Import contacts routes
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json'); // Import swagger file

router.use('/contacts', contactsRoutes); // Use contacts routes
router.use('/api-docs', swaggerUi.serve) // Use swagger-ui-express
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); // Set up swagger-ui-express


module.exports = router; // Export router