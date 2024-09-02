const express = require('express');
const router = express.Router();
const Teacher = require('../../models/Teacher');

// Create a new teacher
router.post('/', async (req, res) => {
    const { name, gender, dateOfBirth, contactDetails, salary, assignedClass } = req.body;
    
    try {
        const teacher = new Teacher({
            name,
            gender,
            dateOfBirth,
            contactDetails,
            salary,
            assignedClass
        });

        await teacher.save();
        res.status(201).json(teacher);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('assignedClass');
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get a single teacher by ID
router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
        if (!teacher) {
            return res.status(404).json({ msg: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Update a teacher by ID
router.put('/:id', async (req, res) => {
    const { name, gender, dateOfBirth, contactDetails, salary, assignedClass } = req.body;
    
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { name, gender, dateOfBirth, contactDetails, salary, assignedClass },
            { new: true }
        );

        if (!teacher) {
            return res.status(404).json({ msg: 'Teacher not found' });
        }

        res.json(teacher);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Delete a teacher by ID
router.delete('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!teacher) {
            return res.status(404).json({ msg: 'Teacher not found' });
        }

        res.json({ msg: 'Teacher removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});


router.get('/test', (req, res) => {
    res.send('Teacher routes are working');
});


module.exports = router;
