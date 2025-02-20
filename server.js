const express = require("express");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const app = express();

// Load passport configuration
require("./passport/passport");

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(
        session({
            secret: "secret", // Use a strong secret
            resave: false,
            saveUninitialized: false, // Ensure session is stored only for logged-in users
            cookie: { secure: false, httpOnly: true } // Secure: true for HTTPS
        })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use(cors({
        origin: "https://cse341-project-2xdy.onrender.com", //  frontend URL
        credentials: true // Ensure cookies are sent
    }))
    .use("/", require("./routes/index.js"));

app.get("/", (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.username}`
            : "Logged Out"
    );
});

app.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/api-docs",
        session: true, // Ensure session-based authentication
    }),
    (req, res) => {
        req.session.user = req.user; // Store user in session
        req.session.save(() => {
            res.redirect("/");
        });
    }
);

mongodb.initDb((err) => {
    if (err) {
        console.log(`MongoDB connection error: ${err}`);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});

// middleware/authenticate.js
const isAuthenticated = (req, res, next) => {
    console.log("Session Data:", req.session); // Debugging
    if (!req.session.user) {
        console.log("Unauthorized access attempt:", req.originalUrl);
        return res.status(401).json({
            error: "You do not have access.",
            status: 401
        });
    }
    next();
};

module.exports = { isAuthenticated };
