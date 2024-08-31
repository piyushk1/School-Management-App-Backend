const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from the Authorization header
  const authHeader = req.header('Authorization');
  
  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract the token
  const token = authHeader.split(' ')[1]; // Get the token part after "Bearer "

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
