const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

const getAll = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ message: 'Database not initialized' });
        }

        console.log("Fetching all contacts from MongoDB..."); // Debugging
        const contacts = await db.collection('contacts').find({}).toArray();

        console.log("Contacts Retrieved:", contacts); // Debugging
        if (!contacts.length) {
            return res.status(404).json({ message: 'No contacts found' });
        }

        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


const getSingle = async (req, res) => {
    try {
        const db = getDb();
        const contactId = req.params.id;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: "Invalid contact ID format" });
        }

        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(contactId) });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const createContact = async (req, res) => {
    try {
        const db = getDb();
        const { email, firstName, lastName } = req.body;

        if (!email || !firstName || !lastName) {
            return res.status(400).json({ error: "Email, firstName, and lastName are required" });
        }

        const newContact = { email, firstName, lastName };
        const result = await db.collection('contacts').insertOne(newContact);
        const createdContact = await db.collection('contacts').findOne({ _id: result.insertedId });

        res.status(201).json(createdContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateContact = async (req, res) => {
    try {
        const db = getDb();
        const contactId = req.params.id;
        const updatedContact = req.body;

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: "Invalid contact ID format" });
        }

        const result = await db.collection('contacts').updateOne(
            { _id: new ObjectId(contactId) },
            { $set: updatedContact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        const updated = await db.collection('contacts').findOne({ _id: new ObjectId(contactId) });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const db = getDb();
        const contactId = req.params.id;
        const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(contactId) });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};