const { eq, sql } = require('drizzle-orm');
const booksTable = require('../models/book.model.js');
const authorsTable = require('../models/author.model.js');
const db = require('../db/index');

async function getAllBooks(req, res) {
  const searchParams = req.query.search;

  if (searchParams) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${searchParams})`
      );

    return res.json(books);
  };

  const books = await db.select().from(booksTable);
  res.json(books);
};

async function getBookById(req, res) {
  const bookId = req.params.id;

  const [book] = await db
    .select()
    .from(booksTable)
    .where((table => eq(table.id, bookId)))
    .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
    .limit(1);

  if (!book) {
    return res.status(404).json({
      error: `Book with id ${id} does not exists!`
    });
  };

  return res.json(book);
};

async function createBook(req, res) {
  const { title, description, authorId } = req.body;

  if (!title || title === '') {
    return res.status(400).json({
      error: `Title is required!`
    });
  };

  if (!authorId || authorId === '') {
    return res.status(400).json({
      error: `Author is required!`
    });
  };

  const newBook = await db
    .insert(booksTable)
    .values({ title, description, authorId })
    .returning({ id: booksTable.id });

  return res.status(201).json({
    message: 'Book created successfully',
    id: newBook.id
  });
};

async function updateBook(req, res) {
  const bookId = req.params.id;

  if (!bookId || bookId === '') {
    return res.status(400).json({
      error: `Book Id is required!`
    });
  };

  const { title, description, authorId } = req.body;

  if (title === '') {
    return res.status(400).json({
      error: `Title cannot be empty!`
    });
  };

  if (authorId === '') {
    return res.status(400).json({
      error: `Author cannot be empty!`
    });
  };

  const existingBook = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, bookId))
    .limit(1);

  if (!existingBook || existingBook.length === 0) {
    return res.status(404).json({
      error: `Book with id ${bookId} does not exists!`
    });
  };

  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (authorId !== undefined) updateData.authorId = authorId;

  const updatedBook = await db
    .update(booksTable)
    .set(updateData)
    .where(eq(booksTable.id, bookId))
    .returning();

  return res.status(200).json(updatedBook[0]);
};

async function deleteBook(req, res) {
  const bookId = req.params.id;

  const existingBook = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, bookId))
    .limit(1);

  if (!existingBook || existingBook.length === 0) {
    return res.status(404).json({
      message: `Book with id: ${bookId} not found`
    });
  };

  await db.delete(booksTable).where(eq(booksTable.id, bookId));

  return res.status(200).json({
    message: `Book with id: ${bookId} successfully deleted!`
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};