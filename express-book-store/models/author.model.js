const { pgTable, uuid, varchar } = require('drizzle-orm/pg-core');

const authorsTable = pgTable('authors', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 55 }).notNull(),
  lastName: varchar('last_name', { length: 55 }).notNull(),
  email: varchar('email', { length: 55 }).notNull().unique(),
});

module.exports = authorsTable;