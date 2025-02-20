const router = require("express").Router();
const passport = require("passport");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const contactController = require('../controllers/contacts');
const contactsRoutes = require('./contacts');
const studentsRoutes = require('./students');

router.use("/", require("./swagger"));

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

module.exports = router;
