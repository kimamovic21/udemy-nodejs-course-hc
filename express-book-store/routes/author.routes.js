const express = require('express');
const router = express.Router();

const {
  getAllAuthors,
  getAuthorById,
  getAllBooksByAuthorId,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/author.controller.js');

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.get('/:id/books', getAllBooksByAuthorId);
router.post('/', createAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;