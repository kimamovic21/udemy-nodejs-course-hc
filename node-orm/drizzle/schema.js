const { pgTable, integer, varchar } = require('drizzle-orm/pg-core');

const usersTable = pgTable('users', {
  id: integer().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 100 }).notNull().unique(),
});

module.exports = {
  usersTable,
};