const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll);
routes.get('/:temple_id', temples.findOne);


// Update a temple's information
routes.put('/temples/:id', (req, res) => {
    const templeId = req.params.id;
    const updatedTemple = req.body;
    // Logic to update temple information in the database
    res.send(`Temple with ID: ${templeId} has been updated`);
});

// Delete a temple
routes.delete('/temples/:id', (req, res) => {
    const templeId = req.params.id;
    // Logic to delete a temple from the database
    res.send(`Temple with ID: ${templeId} has been deleted`);
});


routes.post('/', temples.create);

module.exports = routes;
