const { eq } = require('drizzle-orm');
const authorsTable = require('../models/author.model.js');
const booksTable = require('../models/book.model.js');
const db = require('../db/index');

async function getAllAuthors(req, res) {
  const authors = await db.select().from(authorsTable);
  return res.json(authors);
};

async function getAuthorById(req, res) {
  const authorId = req.params.id;

  const [author] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, authorId));

  if (!author) {
    return res.status(404).json({
      error: `Author with id ${authorId} does not exists!`
    });
  };

  return res.json(author);
};

async function getAllBooksByAuthorId(req, res) {
  const authorId = req.params.id;

  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, authorId));

  return res.json(books);
};

async function createAuthor(req, res) {
  const { firstName, lastName, email } = req.body;

  if (!firstName) {
    return res.status(400).json({
      error: 'First name is required!'
    });
  };

  if (!email) {
    return res.status(400).json({
      error: 'Email is required!'
    });
  };

  const [newUser] = await db
    .insert(authorsTable)
    .values({
      firstName,
      lastName,
      email
    }).returning({ id: authorsTable.id });

  return res.status(201).json({
    message: `Author has been created`, id: newUser.id
  });
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  getAllBooksByAuthorId,
  createAuthor,
};