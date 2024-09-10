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

    // Fetch the last inserted student and get their uidNumber
    const lastStudent = await Student.findOne().sort({ uidNumber: -1 });

    // Generate UID (start from '2024001' if no student exists)
    let newUidNumber = '2024001';
    if (lastStudent && lastStudent.uidNumber) {
      const lastUidNumber = parseInt(lastStudent.uidNumber);
      newUidNumber = (lastUidNumber + 1).toString();
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
      uidNumber: newUidNumber,   // Assign the new UID number
    });

    await student.save();

    // Generate JWT token
    const token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Student registered successfully', token, uidNumber: newUidNumber });
  } catch (error) {
    console.error('Error during student signup:', error.stack);  // Log full error stack
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Student Login Route
router.post('/login', async (req, res) => {
  const { email, password, uidNumber } = req.body;

  try {
    // Find student by uidNumber or email
    let student;
    if (uidNumber) {
      student = await Student.findOne({ uidNumber });
    } else if (email) {
      student = await Student.findOne({ email });
    }

    // If student not found, return an error
    if (!student) {
      return res.status(400).json({ message: 'Invalid UID/Email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid UID/Email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id, role: student.role, uidNumber: student.uidNumber, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Check if profile is complete
router.get('/checkProfileCompletion/:uidNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ uidNumber: req.params.uidNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if all required profile fields are filled
    const isProfileComplete = student.gender && student.dob && student.phoneNo;

    res.status(200).json({ isProfileComplete: !!isProfileComplete });
  } catch (error) {
    console.error('Error checking profile completion:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.put('/updateProfile/:uidNumber', async (req, res) => {
  const { gender, dob, phoneNo } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { gender, dob, phoneNo },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:uidNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ uidNumber: req.params.uidNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
