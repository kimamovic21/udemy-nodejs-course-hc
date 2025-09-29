import { createHmac, randomBytes } from 'crypto';
import { type Request, type Response } from 'express';
import { eq } from 'drizzle-orm';
import { usersTable } from '../models';
import db from '../db';

export async function signUpUser(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ error: 'All fields are required.' });
    };

    const [existingUser] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser) {
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists!` });
    };

    const salt = randomBytes(32).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    const [user] = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
        updatedAt: new Date(),
      })
      .returning({ id: usersTable.id });

    return res
      .status(201)
      .json({ data: { userId: user!.id } });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error!' });
  };
};