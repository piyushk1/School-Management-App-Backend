const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../../models/Student'); 
const router = express.Router();
require('dotenv').config();



router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if email is already registered
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new student
    const student = new Student({
      name,
      email,
      password: hashedPassword,  // Store the hashed password
      role: role || 'Student',   // Ensure role defaults to 'Student'
    });

    await student.save();

    // Generate JWT token
    const token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ message: 'Student registered successfully', token });
  } catch (error) {
    console.error('Error during student signup:', error.stack);  // Log full error stack
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Student Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id, role: student.role, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
