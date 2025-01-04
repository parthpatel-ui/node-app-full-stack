const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { basicAuth, verifyToken } = require('../middlewares/authMiddleware');
const SECRET_KEY = process.env.SECRET_KEY;

// Protected route with Basic Auth
router.get('/basic-secure', basicAuth, (req, res) => {
    res.json({ message: 'This is a basic secure route' });
});

//Generate Token
router.get('/generate-token', (req, res) => {
    // Payload for the token
    const payload = {
        username : "test"
    };

    // Generate the token without an expiry
    const token = jwt.sign(payload, SECRET_KEY);

    res.json({
        message: 'Token generated successfully',
        token: token,
    });
});

// Protected route with Token bases Auth
router.get('/token-secure', verifyToken, (req, res) => {
    res.json({ message: 'This is a token secure route' });
});

module.exports = router;