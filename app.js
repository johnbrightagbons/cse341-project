const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./database/mongodb').mongoConnect;

const app = express();

app.use(bodyParser.json());

// ...existing code...

mongoConnect(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
