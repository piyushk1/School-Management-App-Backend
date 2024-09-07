const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin');
const router = express.Router();
require('dotenv').config();

router.post('/admin-signup', async (req, res) => {

  console.log("Admin Signup");

  const { name, email, password, schoolName,role } = req.body;
  console.log("Req Body is",name, email, password, schoolName,role );

  try {
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: 'Admin already exists' });

    admin = new Admin({ name, email, password, schoolName,role });
    await admin.save();

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    res.status(201).json({ token, message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


