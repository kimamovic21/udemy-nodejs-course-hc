import { pgTable, timestamp, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { usersTable } from './user.model';

export const urlsTable = pgTable('urls', {
  id: uuid('id').primaryKey().defaultRandom(),

  shortCode: varchar('short_code', { length: 155 }).notNull().unique(),
  targetURL: text('target_url').notNull(),

  userId: uuid('user_id').references(() => usersTable.id).notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});