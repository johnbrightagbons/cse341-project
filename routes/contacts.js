const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Import ObjectId
const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', (req, res, next) => {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    contactsController.getSingle(req, res);
});

router.post('/', validation.saveContact, contactsController.createContact);

router.put('/:id', validation.saveContact, (req, res, next) => {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    contactsController.updateContact(req, res);
});

router.delete('/:id', (req, res, next) => {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    contactsController.deleteContact(req, res);
});

module.exports = router;