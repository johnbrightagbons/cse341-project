const express = require('express');
const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb
const getDb = require('../data/database').getDb; // Corrected function name
const contactsController = require('../controllers/contacts');

const router = express.Router();

router.get('/', contactsController.getAllContacts);

router.get('/:id', (req, res, next) => {
    contactsController.getContactById(req, res);

});

router.post('/', (req, res, next) => {
    contactsController.createContact(req, res);
});

router.put('/:id', (req, res, next) => {
    contactsController.updateContact(req, res);
});

router.delete('/:id', (req, res, next) => {
    contactsController.deleteContact(req, res);
});

module.exports = router;


