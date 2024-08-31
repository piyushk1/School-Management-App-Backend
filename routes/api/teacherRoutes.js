// routes/api/teacherRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const roleAuth = require('../../middleware/roleAuth');

router.get('/my-classes', auth, roleAuth(['teacher']), (req, res) => {
  res.json({ message: 'Teacher classes data access granted' });
});

module.exports = router;

