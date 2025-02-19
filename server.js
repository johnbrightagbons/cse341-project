const cors = require('cors');
require('dotenv').config();
console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passport/passport.js');
const { connectDB } = require('./data/database');

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
// Use the cors middleware instead
app.use(cors({
    origin: 'https://cse341-project-2xdy.onrender.com',
    credentials: true,
}))
// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes setup
const routes = require("./routes/index.js");
app.use("/", routes);

// Root route to show if user is logged in or logged out
app.get('/', (req, res) => {
    res.send(req.session.user ? `Logged in as ${req.session.user.username}` : "Logged Out");
});

// GitHub OAuth callback route
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: true,
}), (req, res) => {
    // On successful login, store the user profile in the session
    req.session.user = req.user.profile;
    console.log(req.user);
    res.redirect('/');  // Redirect to root route
});

// Start server
connectDB().then(() => {
    const server = app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });

    server.on('error', (err) => {
        console.error('❌ Error starting server:', err);
    });
}).catch(err => {
    console.error('❌ Database connection error:', err);
});