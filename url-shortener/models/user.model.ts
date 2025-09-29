import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),

  firstName: varchar('first_name', { length: 55 }).notNull(),
  lastName: varchar('last_name', { length: 55 }),

  email: varchar({ length: 255 }).notNull().unique(),

  password: varchar({ length: 255 }).notNull(),
  salt: varchar({ length: 255 }).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});
