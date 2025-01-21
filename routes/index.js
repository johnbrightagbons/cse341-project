const express = require('express');
const router = express.Router();
const contactsRoutes = require('./contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/contacts', contactsRoutes);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;