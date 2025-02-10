const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

const getAll = async (req, res) => {
    try {
        const db = getDb();
        const contacts = await db.collection('contacts').find().toArray();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const db = getDb();
        const contactId = req.params.id;
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(contactId) });
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createContact = async (req, res) => {
    try {
        const db = getDb();
        const newContact = req.body;
        const result = await db.collection('contacts').insertOne(newContact);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const db = getDb();
        const contactId = req.params.id;
        const updatedContact = req.body;
        const result = await db.collection('contacts').updateOne(
            { _id: new ObjectId(contactId) },
            { $set: updatedContact }
        );
        res.status(200).json(result);
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