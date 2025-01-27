const { ObjectId } = require('mongodb');
const getDb = require('../data/database').getDb;

const getAll = (req, res, next) => {
    const db = getDb();
    db.collection('contacts')
        .find()
        .toArray()
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

const getSingle = (req, res, next) => {
    const db = getDb();
    const contactId = req.params.id;
    db.collection('contacts')
        .findOne({ _id: new ObjectId(contactId) })
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

const createContact = (req, res, next) => {
    const db = getDb();
    const newContact = req.body;
    db.collection('contacts')
        .insertOne(newContact)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

const updateContact = (req, res, next) => {
    const db = getDb();
    const contactId = req.params.id;
    const updatedContact = req.body;
    db.collection('contacts')
        .updateOne({ _id: new ObjectId(contactId) }, { $set: updatedContact })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

const deleteContact = (req, res, next) => {
    const db = getDb();
    const contactId = req.params.id;
    db.collection('contacts')
        .deleteOne({ _id: new ObjectId(contactId) })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
