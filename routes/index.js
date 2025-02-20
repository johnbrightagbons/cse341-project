<<<<<<< HEAD
const router = require("express").Router();
const passport = require("passport");
=======
const express = require('express'); // Import express
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const contactController = require('../controllers/contacts');
const contactsRoutes = require('./contacts'); // Import contacts routes
const studentsRoutes = require('./students'); // Import students routes
>>>>>>> 3349da8c234a9c0bd70f3e027a43262c4fd68070

router.use("/", require("./swagger"));


<<<<<<< HEAD
// Mount routes
router.use("/contacts", require("./contacts"));

router.get("/login", passport.authenticate("github"), (req, res) => { });

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
=======

router.get('/contacts', contactController.getAll); // GET request to /contacts will call getAll
//router.get('/login', passport.authenticate('github'), (req, res) => { });

//router.get('/logout', function (req, res, next) {
//req.logout(function (err) {
//     if (err) { return next(err); }
//   res.redirect('/');
//});
//});
>>>>>>> 3349da8c234a9c0bd70f3e027a43262c4fd68070

module.exports = router;
