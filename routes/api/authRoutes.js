// routes/api/auth.js
const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../../middleware/authmiddleware.js');

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});


// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'This is a protected route', user: req.user });
});

module.exports = router;
