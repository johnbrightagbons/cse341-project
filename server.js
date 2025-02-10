require('dotenv').config();
console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const cors = require('cors');
const { connectDB } = require('./data/database'); // Ensure database is imported

const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(session({
    secret: "secret",  // Secret key for session management
    resave: false,
    saveUninitialized: true,
}));

// Root route to show if user is logged in or logged out
app.get('/', (req, res) => {
    res.send(req.session.user ? `Logged in as ${req.session.user.username}` : "Logged Out");
});

// GitHub OAuth callback route
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    // On successful login, store the user profile in the session
    req.session.user = req.user;
    res.redirect('/');  // Redirect to root route
});


// MongoDB connection setup (ensure it's connected before starting the server)
connectDB().then(() => {
    // Set CORS and Passport session middleware
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors({ origin: '*' }));

    // Routes import (ensure your routes are correct here)
    app.use("/", require("./routes/index.js"));

    // Start server after successful database connection
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
}).catch(err => {
    console.error('❌ Database connection error:', err);
});