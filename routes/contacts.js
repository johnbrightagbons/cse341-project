const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Import ObjectId
const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', async (req, res) => {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    await contactsController.getSingle(req, res);
});

router.post('/', validation.saveContact, contactsController.createContact);

router.put('/:id', validation.saveContact, async (req, res) => {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    await contactsController.updateContact(req, res);
});

router.delete('/:id', async (req, res) => {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    await contactsController.deleteContact(req, res);
});

module.exports = router;