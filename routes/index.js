const express = require('express'); // Import express
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const contactsRoutes = require('./contacts'); // Import contacts routes
const studentsRoutes = require('./students'); // Import students routes

const router = express.Router(); // Create router

router.use('/contacts', contactsRoutes); // Use contacts routes
router.use('/students', studentsRoutes); // Use students routes
router.use('/api-docs', swaggerUi.serve); // Use swagger-ui-express
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); // Set up swagger-ui-express

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router; // Export router





