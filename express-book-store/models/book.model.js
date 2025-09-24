const {
  pgTable,
  uuid,
  varchar,
  text,
  index
} = require('drizzle-orm/pg-core');
const { sql } = require('drizzle-orm');
const authorTable = require('./author.model');

const booksTable = pgTable(
  'books',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 100 }).notNull(),
    description: text('description'),
    authorId: uuid('author_id')
      .references(() => authorTable.id)
      .notNull(),
  },
  (table) => ({
    searchIndexOnTitle: index('title_index').using(
      'gin',
      sql`to_tsvector('english', ${table.title})`
    ),
  }),
);

module.exports = booksTable;