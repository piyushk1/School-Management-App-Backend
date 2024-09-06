const express = require('express');
const router = express.Router();
const { AdminSignup, AdminLogin } = require('../controllers/AdminController'); // Import admin controller functions
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// Admin routes
router.post('/admin/signup', AdminSignup); // Link to AdminSignup function from the controller
router.post('/admin/login', AdminLogin);   // Link to AdminLogin function from the controller

// Student Login
router.post('/student/login', async (req, res) => {
  const { email, password, uidNumber } = req.body;

  try {
    // Check if the student exists with the provided email and uidNumber
    const student = await Student.findOne({ email, uidNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found or invalid UID' });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: student._id, role: 'Student' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Teacher Login
router.post('/teacher/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the teacher exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: teacher._id, role: 'Teacher' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
