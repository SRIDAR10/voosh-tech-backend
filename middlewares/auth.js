const jwt = require('jsonwebtoken');

const decryptToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (!bearer || bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization header format' });
  }
  next()
};

module.exports = {
  decryptToken
};