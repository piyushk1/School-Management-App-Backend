// routes/api/studentRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const roleAuth = require('../../middleware/roleAuth');

router.get('/my-grades', auth, roleAuth(['student']), (req, res) => {
  res.json({ message: 'Student grades access granted' });
});

module.exports = router;
