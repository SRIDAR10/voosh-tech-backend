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

  try {
    const decodedUserInfo = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedUserInfo;
    next()

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      console.error('Failed to verify token:', err);
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
  }
};

module.exports = {
  decryptToken
};