import { pgTable, timestamp, uuid, varchar, text } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),

  firstName: varchar('first_name', { length: 55 }).notNull(),
  lastName: varchar('last_name', { length: 55 }),

  email: varchar('email', { length: 255 }).notNull().unique(),

  password: text('password').notNull(),
  salt: text('salt').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
