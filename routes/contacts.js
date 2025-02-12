const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

// Get all contacts
router.get('/', contactsController.getAll);

// Get single contact (with error handling)
router.get('/:id', async (req, res, next) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        await contactsController.getSingle(req, res);
    } catch (error) {
        next(error);
    }
});

// Create contact (with validation)
router.post('/', validation.saveContact, (req, res) => {
    console.log("🔍 Request Body Received:", req.body); // Debugging line
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "❌ Request body is empty!" });
    }
    contactsController.createContact(req, res);
});

// Update contact (with validation and error handling)
router.put('/:id', validation.saveContact, async (req, res, next) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        await contactsController.updateContact(req, res);
    } catch (error) {
        next(error);
    }
});

// Delete contact (with error handling)
router.delete('/:id', async (req, res, next) => {
    try {
        const contactId = req.params.id;
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        await contactsController.deleteContact(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
