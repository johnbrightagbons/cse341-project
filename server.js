// Initialize express and mongodb in server.js
const mongodb = require('./data/database'); // Import mongodb
const express = require('express'); // Import express
const app = express(); // Initialize express

const port = process.env.PORT || 3000; // Port number

app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

app.use('/', require('./routes')); // Use the routes

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on port ${port}`);
        }); // Server is running on port 3000
    }
});