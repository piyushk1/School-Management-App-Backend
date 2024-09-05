// const express = require('express');
// const router = express.Router();
// const Class = require('../../models/Class');
// const Teacher = require('../../models/Teacher');
// const Student = require('../../models/Student');

// // Create a new class
// router.post('/', async (req, res) => {
//     const { name, year, teacher, studentFees, students } = req.body;

//     try {
//         // Validate that teacher exists
//         // const existingTeacher = await Teacher.findById(teacher);
//         // if (!existingTeacher) {
//         //     return res.status(400).json({ msg: 'Teacher not found' });
//         // }

//         // Validate that students exist
//         // if (students) {
//         //     const existingStudents = await Student.find({ '_id': { $in: students } });
//         //     if (existingStudents.length !== students.length) {
//         //         return res.status(400).json({ msg: 'Some students not found' });
//         //     }
//         // }

//         // Check if student limit is exceeded

//         // if (students && students.length > 30) { 
//         //     return res.status(400).json({ msg: 'Student limit exceeded' });
//         // }

//         const newClass = new Class({ name, year, teacher, studentFees, students });
//         await newClass.save();
//         res.status(201).json(newClass);
//     } catch (err) {
//         res.write(err);
//         res.status(500).json({ msg: 'Server error' });
//     }
// });

// // Get all classes
// router.get('/', async (req, res) => {
//     console.log('GET /api/classes route hit');

//     try {
//         const classes = await Class.find().populate('teacher').populate('students');
//         res.json(classes);
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// });

// // Get a specific class by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const cls = await Class.findById(req.params.id).populate('teacher').populate('students');
//         if (!cls) {
//             return res.status(404).json({ msg: 'Class not found' });
//         }
//         res.json(cls);
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// });

// // Update a class
// router.put('/:id', async (req, res) => {
//     const { name, year, teacher, studentFees, students } = req.body;

//     try {
//         // Validate that teacher exists
//         const existingTeacher = await Teacher.findById(teacher);
//         if (!existingTeacher) {
//             return res.status(400).json({ msg: 'Teacher not found' });
//         }

//         // Validate that students exist
//         if (students) {
//             const existingStudents = await Student.find({ '_id': { $in: students } });
//             if (existingStudents.length !== students.length) {
//                 return res.status(400).json({ msg: 'Some students not found' });
//             }
//         }

//         // Check if student limit is exceeded
//         if (students && students.length > 30) { // Assuming a limit of 30 students per class
//             return res.status(400).json({ msg: 'Student limit exceeded' });
//         }

//         const updatedClass = await Class.findByIdAndUpdate(
//             req.params.id,
//             { name, year, teacher, studentFees, students },
//             { new: true }
//         );
//         res.json(updatedClass);
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// });

// // Delete a class
// router.delete('/:id', async (req, res) => {
//     try {
//         await Class.findByIdAndDelete(req.params.id);
//         res.json({ msg: 'Class deleted' });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Class = require('../../models/Class'); 
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');
// GET all classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find().populate('teacher students');
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific class by ID
router.get('/:id', async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id).populate('teacher students');
        if (!classItem) return res.status(404).json({ message: 'Class not found' });
        res.status(200).json(classItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// POST endpoint to create a new class
router.post('/', async (req, res) => {
  try {
    const { name, year, teacherName, studentFees, students } = req.body;

    // Validate input
    if (!name || !year || !teacherName || !studentFees || !students) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!Array.isArray(students) || students.length === 0 || students.some(student => typeof student !== 'string')) {
      return res.status(400).json({ message: 'Invalid students data' });
    }

    // Create a new class instance
    const newClass = new Class({
      name,
      year,
      teacherName,
      studentFees,
      students
    });

    // Save the new class to the database
    await newClass.save();

    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;



// PUT to update a class
router.put('/:id', async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('teacher students');

        if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a class
router.delete('/:id', async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) return res.status(404).json({ message: 'Class not found' });
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

