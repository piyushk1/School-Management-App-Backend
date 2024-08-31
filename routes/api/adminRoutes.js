

// routes/api/adminRoutes.js

const auth = require('../../middleware/auth');
const roleAuth = require('../../middleware/roleAuth');
const express = require('express');
const router = express.Router();

// Admin-only route
router.get('/dashboard', auth, roleAuth(['admin']), (req, res) => {
  res.json({ message: 'Admin dashboard access granted' });
});

// Route accessible by both admin and teachers
router.get('/classes', auth, roleAuth(['admin', 'teacher']), (req, res) => {
  res.json({ message: 'Classes data access granted' });
});

// Route for creating new teacher accounts (admin only)
router.post('/create-teacher', auth, roleAuth(['admin']), (req, res) => {
  // Logic to create a new teacher account
  res.json({ message: 'New teacher account created' });
});

module.exports = router;