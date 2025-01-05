const express = require('express');
const router = express.Router();
const { getAllDocuments, getDocumentById, createTodo, updateDocumentById, deleteDocumentById } = require('../controllers/todoController');
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

module.exports = router;
