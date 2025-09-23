const { pgTable, uuid, varchar, text } = require('drizzle-orm/pg-core');
const authorTable = require('./author.model');

const booksTable = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  authorId: uuid('author_id').references(() => authorTable.id).notNull(),
});

module.exports = booksTable;