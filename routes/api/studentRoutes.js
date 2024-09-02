// routes/api/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../../models/Student');

// Create a new student
router.post('/', async (req, res) => {
    const { name, gender, dateOfBirth, contactDetails, feesPaid, class: classId } = req.body;
    
    try {
        const student = new Student({
            name,
            gender,
            dateOfBirth,
            contactDetails,
            feesPaid,
            class: classId,
        });

        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('class');
        res.json(students);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get a single student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('class');
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Update a student by ID
router.put('/:id', async (req, res) => {
    const { name, gender, dateOfBirth, contactDetails, feesPaid, class: classId } = req.body;
    
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, gender, dateOfBirth, contactDetails, feesPaid, class: classId },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        res.json(student);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        res.json({ msg: 'Student removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;
