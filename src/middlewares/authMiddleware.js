const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware for Basic Authentication
const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Check username and password
    if (username === 'user' && password === 'pass') {
        next(); // Authentication successful, proceed to the next middleware
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};


// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    });
};  

module.exports = { basicAuth, verifyToken };