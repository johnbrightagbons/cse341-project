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

// Middleware setup
app.use(bodyParser.json());

// Express-session setup
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));

// CORS setup
const corsOptions = {
    origin: 'https://cse341-project-2xdy.onrender.com',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use(cors(corsOptions));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes setup
const routes = require("./routes/index.js");
app.use("/", routes);

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
