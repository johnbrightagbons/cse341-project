require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser'); // Ensure body-parser is properly imported
const cors = require('cors');
const session = require('express-session');
const passport = require('./passport/passport.js'); // Ensure Passport is set up correctly
const { connectDB } = require('./data/database'); // Import MongoDB connection

const app = express();
const port = process.env.PORT || 3000;

// Debugging: Check if .env variables are loaded correctly
console.log("MongoDB URI:", process.env.MONGODB_URI);
console.log("GitHub Client ID:", process.env.GITHUB_CLIENT_ID);

// ✅ Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({ origin: '*' })); // Enable CORS

// ✅ Session setup
app.use(session({
    secret: "secret",  // Use .env secret for security
    resave: false,
    saveUninitialized: true,
}));

// ✅ Initialize Passport (Authentication)
app.use(passport.initialize());
app.use(passport.session());

// ✅ Test route to check session status
app.get('/', (req, res) => {
    res.send(req.session.user ? `Logged in as ${req.session.user.username}` : "Logged Out");
});

// ✅ GitHub OAuth Callback
app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: false }), (req, res) => {
    req.session.user = req.user.profile; // Store user in session
    console.log("GitHub User:", req.user);
    res.redirect('/'); // Redirect to home
});

// ✅ Import API Routes
app.use("/", require("./routes/index.js"));

// ✅ Connect to MongoDB before starting the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
}).catch(err => {
    console.error('❌ Database connection error:', err);
});
