const jwt = require('jsonwebtoken');

const jwtSecret = require('../controllers/authController').secretKey;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
