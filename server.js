const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
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

// Passport GitHub strategy setup
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || 'http://localhost:3000/github/callback'  // Default fallback URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);  // Store the user profile in the session
});

passport.deserializeUser((user, done) => {
    done(null, user);  // Retrieve user profile from session
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