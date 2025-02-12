const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

/**
 * Get all contacts from the database
 */
const getAll = async (req, res) => {
    try {
        const db = getDb();
        const contacts = await db.collection('contacts').find().toArray();
        res.status(200).json({
            success: true,
            message: "Contacts retrieved successfully",
            data: contacts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve contacts",
            error: err.message
        });
    }
};

/**
 * Get a single contact by ID
 */
const getSingle = async (req, res) => {
    try {
        const db = getDb();
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact ID format"
            });
        }

        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(contactId) });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact retrieved successfully",
            data: contact
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve contact",
            error: err.message
        });
    }
};

/**
 * Create a new contact with required fields validation
 */
const createContact = async (req, res) => {
    try {
        const db = getDb();
        const { firstName, lastName, email, favouriteColour, birthday, school, status } = req.body;

        // Ensure required fields are provided
        if (!firstName || !lastName || !email) {
            return res.status(400).json({
                success: false,
                message: "First name, last name, and email are required"
            });
        }

        const newContact = { firstName, lastName, email, favouriteColour, birthday, school, status };

        const result = await db.collection('contacts').insertOne(newContact);

        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: { _id: result.insertedId, ...newContact }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create contact",
            error: err.message
        });
    }
};

/**
 * Update a contact by ID
 */
const updateContact = async (req, res) => {
    try {
        const db = getDb();
        const contactId = req.params.id;
        const { firstName, lastName, email, favouriteColour, birthday, school, status } = req.body;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact ID format"
            });
        }

        // Ensure at least one field is provided for updating
        if (!firstName && !lastName && !email && !favouriteColour && !birthday && !school && !status) {
            return res.status(400).json({
                success: false,
                message: "At least one field must be provided for updating."
            });
        }

        const updatedContact = { firstName, lastName, email, favouriteColour, birthday, school, status };

        const result = await db.collection('contacts').updateOne(
            { _id: new ObjectId(contactId) },
            { $set: updatedContact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: updatedContact
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update contact",
            error: err.message
        });
    }
};

/**
 * Delete a contact by ID
 */
const deleteContact = async (req, res) => {
    try {
        const db = getDb();
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact ID format"
            });
        }

        const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(contactId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete contact",
            error: err.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};