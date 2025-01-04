const express = require('express');
const router = express.Router();
const { getAllDocuments, getDocumentById } = require('../controllers/todoController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

// Protected route with Token bases Auth
router.get('/', getAllDocuments);

// Protected route with Token bases Auth
router.get('/:id', getDocumentById);

module.exports = router;
