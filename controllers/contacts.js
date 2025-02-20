const mongodb = require("../data/database");
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary='Get all contacts'
    //#swagger.description='Retrieve a list of all contacts'
    /* #swagger.responses[200] = {
        description: 'List of contacts',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/Contact' }
            }
        }
    } */
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

const getSingleContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary='Get a single contact'
    //#swagger.description='Retrieve details of a specific contact'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'Contact details',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/Contact' }
            }
        }
    } */
    /* #swagger.responses[404] = {
        description: 'Contact not found'
    } */
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId }).toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary='Create a new contact'
    //#swagger.description='Add a new contact to the database'
    /* #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/Contact' }
            }
        }
    } */
    /* #swagger.responses[204] = {
        description: 'Contact created successfully'
    } */
    /* #swagger.responses[500] = {
        description: 'Error creating contact'
    } */
    const user = {
        user_id: req.body.user_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColour: req.body.favouriteColour,
        birthday: req.body.birthday,
        school: req.body.school,
        status: req.body.status,
        logins_count: req.body.logins_count,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        last_login: req.body.last_login,
        email_verified: req.body.email_verified
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary='Update a contact'
    //#swagger.description='Update an existing contact'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/Contact' }
            }
        }
    } */
    /* #swagger.responses[204] = {
        description: 'Contact updated successfully'
    } */
    /* #swagger.responses[500] = {
        description: 'Error updating contact'
    } */
    const userId = new ObjectId(req.params.id);
    const user = {
        user_id: req.body.user_id,
        email: req.body.email,
        favouriteColour: req.body.favouriteColour,
        birthday: req.body.birthday,
        school: req.body.school,
        status: req.body.status,
        logins_count: req.body.logins_count,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        last_login: req.body.last_login,
        email_verified: req.body.email_verified
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    //#swagger.summary='Delete a contact'
    //#swagger.description='Remove a contact from the database'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Contact ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[204] = {
        description: 'Contact deleted successfully'
    } */
    /* #swagger.responses[500] = {
        description: 'Error deleting contact'
    } */
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};
