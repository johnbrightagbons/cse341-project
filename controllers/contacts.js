const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list); // Return list
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getContactById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColour: req.body.favouriteColour,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').insertOne(user);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'User not created');
    }
};

const updateContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    console.log(`Updating user with ID: ${userId}`, req.body); // Log incoming request data
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColour: req.body.favouriteColour,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        console.error(`Failed to update user with ID: ${userId}`, response.error); // Log error
        res.status(500).json(response.error || 'User not updated');
    }
};

const deleteContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    console.log(`Deleting user with ID: ${userId}`); // Log incoming request data
    const response = await mongodb.getDatabase().db(process.env.DB_NAME).collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        console.error(`Failed to delete user with ID: ${userId}`, response.error); // Log error
        res.status(500).json(response.error || 'User not deleted');
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};
