const router = require('express').Router();
const { ObjectId } = require('mongodb'); // Import ObjectId
const { isAuthenticated } = require('../middleware/authenticate');
const mongoose = require('mongoose');
const mongodb = process.env.MONGODB_URI || ''; // Use the connection string from .env

// MongoDB Model for Student
const Student = mongoose.model('Student', new mongoose.Schema({
    name: String,
}, { timestamps: true }));

// Get all students from MongoDB
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students); // Return all students
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve students', error });
    }
});

// Get student by ID from MongoDB
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student); // Return specific student
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve student', error });
    }
});

// Create a new student in MongoDB
router.post('/', async (req, res) => {
    try {
        const newStudent = new Student({
            name: req.body.name
        });
        await newStudent.save();
        res.status(201).json({ message: 'Student created', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create student', error });
    }
});

// Update student by ID in MongoDB
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true } // Return the updated student
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: `Student ${req.params.id} updated`, student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update student', error });
    }
});

// Delete student by ID from MongoDB
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: `Student ${req.params.id} deleted`, student: deletedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete student', error });
    }
});

module.exports = router;