const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser
const mongodb = require('./data/database'); // Corrected path to mongodb
const app = express(); // Initialize express
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000; // Port number
app.use(bodyParser.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))


//Express Session Initialization
app
    .use(passport.initialize())
    // Init passport on every route call,
    .use(passport.session())
    // Allow passport to use express session
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, z-key, Authorization"
        )
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next()
    });

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
app.use(cors({ origin: '*' }))
app.use("/", require("./routes/index.js")); // Ensure this line is correct

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (acessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") })
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});