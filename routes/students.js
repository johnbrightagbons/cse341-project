const router = require('express').Router();
const { ObjectId } = require('mongodb');
const { isAuthenticated } = require('../middleware/authenticate');
const { getDb } = require('../data/database');

// Get all students from MongoDB
router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const students = await db.collection('students').find().toArray();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve students', error });
    }
});

// Get student by ID from MongoDB
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const db = getDb();
        const student = await db.collection('students').findOne({ _id: new ObjectId(req.params.id) });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve student', error });
    }
});

// Create a new student in MongoDB
router.post('/', async (req, res) => {
    try {
        const db = getDb();
        const newStudent = { name: req.body.name };
        const result = await db.collection('students').insertOne(newStudent);
        res.status(201).json({ message: 'Student created', student: result.ops[0] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create student', error });
    }
});

// Update student by ID in MongoDB
router.put('/:id', async (req, res) => {
    try {
        const db = getDb();
        const updatedStudent = await db.collection('students').findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { name: req.body.name } },
            { returnOriginal: false }
        );
        if (!updatedStudent.value) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: `Student ${req.params.id} updated`, student: updatedStudent.value });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update student', error });
    }
});

// Delete student by ID from MongoDB
router.delete('/:id', async (req, res) => {
    try {
        const db = getDb();
        const deletedStudent = await db.collection('students').findOneAndDelete({ _id: new ObjectId(req.params.id) });
        if (!deletedStudent.value) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: `Student ${req.params.id} deleted`, student: deletedStudent.value });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete student', error });
    }
});

module.exports = router;