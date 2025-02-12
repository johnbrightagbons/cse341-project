const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Import ObjectId
const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        await contactsController.getAll(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        await contactsController.getSingle(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// POST create a new contact
router.post('/', validation.saveContact, async (req, res) => {
    try {
        await contactsController.createContact(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// PUT update an existing contact
router.put('/:id', validation.saveContact, async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        await contactsController.updateContact(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        await contactsController.deleteContact(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
