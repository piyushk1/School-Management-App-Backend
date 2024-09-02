const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Example protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'This is a protected route', user: req.user });
});

module.exports = router;
