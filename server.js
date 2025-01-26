require('dotenv').config();
const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser
const routes = require('./routes/index'); // Import routes
const mongodb = require('./data/database'); // Corrected path to mongodb
const app = express(); // Initialize express

const port = process.env.PORT || 3000; // Port number
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.use('/', routes);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});