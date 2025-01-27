const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser
const mongodb = require('./data/database'); // Corrected path to mongodb
const app = express(); // Initialize express

const port = process.env.PORT || 3000; // Port number
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
});
app.use("/", require("./routes/index.js"));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});