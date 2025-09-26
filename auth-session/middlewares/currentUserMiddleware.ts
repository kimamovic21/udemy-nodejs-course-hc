import { eq } from 'drizzle-orm';
import { Request, Response, NextFunction } from 'express';
import { userSessions, usersTable } from '../db/schema';
import db from '../db';

export async function currentUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = req.headers['session-id'];

  if (!sessionId) {
    return next();
  };

  const [sessionData] = await db
    .select({
      sessionId: userSessions.id,
      userId: userSessions.userId,
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(userSessions)
    .innerJoin(usersTable, eq(usersTable.id, userSessions.userId))
    .where(eq(userSessions.id, sessionId as string));

  if (!sessionData) {
    return next();
  };

  req.user = sessionData;
  next();
};