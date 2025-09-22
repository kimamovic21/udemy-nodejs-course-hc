const fs = require('node:fs');
const express = require('express');

const app = express();
const PORT = 8000;

// In memory DB
const books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' },
];

// Middlewares (Plugins)
app.use(express.json());

app.use((req, res, next) => {
  console.log('I am Middleware A');
  // return res.json({ msg: 'I am Middleware A' });
  next();
});

app.use((req, res, next) => {
  console.log('I am Middleware B');
  // return res.json({ msg: 'I am Middleware B' });
  next();
});

app.use((req, res, next) => {
  const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
  console.log(log);
  fs.appendFileSync('logs.txt', log, 'utf-8');
  next();
});

// Routes
app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
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
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || title === '') {
    return res.status(400).json({
      error: `Title is required!`
    })
  };

  if (!author || author === '') {
    return res.status(400).json({
      error: `Author is required!`
    })
  };

  const id = books.length + 1;
  const newBook = { id, title, author };

  books.push(newBook);

  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
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
});

app.delete('/books/:id', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});