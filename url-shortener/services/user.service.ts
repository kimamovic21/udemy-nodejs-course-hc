import { eq } from 'drizzle-orm';
import { usersTable } from '../models/user.model';
import db from '../db';

export async function getUserByEmail(email: string) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
};

export async function createNewUser({
  firstName,
  lastName,
  email,
  password,
  salt,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
}) {
  const [user] = await db
    .insert(usersTable)
    .values({
      firstName,
      lastName,
      email,
      password,
      salt,
    })
    .returning({ id: usersTable.id });

  return user;
};