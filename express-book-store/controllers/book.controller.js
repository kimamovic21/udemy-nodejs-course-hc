const booksTable = require('../models/book.model');
const db = require('../db/index');

function getAllBooks(req, res) {
  res.json(books);
};

function getBookById(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: `Id must be of type number`
    });
  };

  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      error: `Book with id ${id} does not exists!`
    });
  };

  return res.json(book);
};

function createBook(req, res) {
  const { title, author } = req.body;

  if (!title || title === '') {
    return res.status(400).json({
      error: `Title is required!`
    });
  };

  if (!author || author === '') {
    return res.status(400).json({
      error: `Author is required!`
    });
  };

  const id = books.length + 1;
  const newBook = { id, title, author };

  books.push(newBook);

  res.status(201).json(newBook);
};

function updateBook(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: `Id must be of type number`
    });
  };

  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      error: `Book with id ${id} does not exists!`
    });
  };

  const { title, author } = req.body;

  if (title === '') {
    return res.status(400).json({
      error: `Title cannot be empty!`
    });
  };

  book.title = title;

  if (author === '') {
    return res.status(400).json({
      error: `Author cannot be empty!`
    });
  };

  book.author = author;

  return res.status(200).json(book);
};

function deleteBook(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: `Id must be of type number`
    });
  };

  const indexToDelete = books.findIndex(book => book.id === id);

  if (indexToDelete < 0) {
    return res.status(404).json({
      error: `Book with id ${id} does not exists!`
    });
  };

  books.splice(indexToDelete, 1);

  return res.status(200).json({
    message: `Book with id: ${id} successfully deleted!`
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};