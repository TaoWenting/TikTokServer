// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = '';  // Replace with your actual secret key
// const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
