const express = require('express');
const router = express.Router();
const { getAllDocuments, getDocumentById, createTodo, updateDocumentById, deleteDocumentById, uploadTaskImage } = require('../controllers/todoController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

//Create Todo
router.post('/', createTodo);

//Get all todos
router.get('/', getAllDocuments);

//Get specific todo
router.get('/:id', getDocumentById);

//Update specific todo
router.put('/:id', updateDocumentById);

//Delete specific todo
router.delete('/:id', deleteDocumentById);

//Upload a file to specific todo
router.post('/:id/upload', uploadTaskImage);

module.exports = router;
