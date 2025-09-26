import { type Request, type Response } from 'express';
import { usersTable } from '../db/schema';
import db from '../db/index';

export async function getAllUsers(req: Request, res: Response) {
  const users = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable);

  return res.status(200).json({ users });
};