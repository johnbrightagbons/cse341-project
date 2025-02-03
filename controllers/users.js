const mongodb = require('../data/database');
const { ObjectId } = require('mongodb').ObjectId;

const getAll = async (req, res) => {

    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('user').find();
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users); // Return list
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    //console.log(req);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0]);
    });
};



const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    //console.log(req);
    const user = {
        user_id: req.body.user_id,
        email: req.body.email,
        name: req.body.name,
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        email: req.body.email,
        last_ip: req.body.last_ip,
        logins_count: req.body.logins_count,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        last_login: req.body.last_login,
        email_verified: req.body.email_verified
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        user_id: req.body.user_id,
        email: req.body.email,
        name: req.body.name,
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        email: req.body.email,
        last_ip: req.body.last_ip,
        logins_count: req.body.logins_count,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        last_login: req.body.last_login,
        email_verified: req.body.email_verified
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
