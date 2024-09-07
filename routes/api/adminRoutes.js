const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, schoolName } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: 'Admin already exists' });

    admin = new Admin({ name, email, password, schoolName });
    await admin.save();

    const token = jwt.sign({ id: admin._id, role: admin.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ token, message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
