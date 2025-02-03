const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllStudents = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('students').find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list); // Return list
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOneStudent = async (req, res) => {
    const studentsId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection('students').findOne({ _id: studentsId });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

