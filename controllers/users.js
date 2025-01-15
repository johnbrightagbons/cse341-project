const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {

    const result = await mongodb.getDatabase().db().collection('user').find();
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list); // Return list

    })

}


const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {

        const result = await mongodb.getDatabase().db().collection('user').findOne({ _id: userId });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle
};