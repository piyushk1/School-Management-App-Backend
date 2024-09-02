
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from the header
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded payload to req.user
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

