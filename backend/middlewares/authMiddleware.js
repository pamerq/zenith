const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'No token provided, authorization denied' }); // No token, unauthorized
  }

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid or expired' }); // Si el token es inválido o expiró
    }
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });

};

module.exports = authenticateToken;
