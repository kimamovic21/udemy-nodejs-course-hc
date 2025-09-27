import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'node:crypto';
import { type Request, type Response } from 'express';
import { usersTable } from '../db/schema';
import jwt from 'jsonwebtoken';
import db from '../db/index';

export async function signUpUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const [existingUser] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where(table => eq(table.email, email));

  if (existingUser) {
    return res
      .status(400)
      .json({ message: `User with ${email} already exists!` });
  };

  const salt = randomBytes(256).toString('hex');
  const hashedPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  const [newUser] = await db.insert(usersTable).values({
    name,
    email,
    password: hashedPassword,
    salt
  }).returning({ id: usersTable.id });

  return res
    .status(201)
    .json({ status: 'success', data: { userId: newUser.id } });
};


export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      salt: usersTable.salt,
      role: usersTable.role,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(table => eq(table.email, email));

  if (!existingUser) {
    return res
      .status(401)
      .json({ error: `Incorrect email or password` });
  };

  const salt = existingUser.salt;
  const existingHash = existingUser.password;

  const newHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

  if (newHash !== existingHash) {
    return res
      .status(401)
      .json({ error: `Incorrect email or password` });
  };

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '10m',
  });

  return res
    .status(200)
    .json({ status: 'success', token });
};

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export async function getCurrentSession(req: AuthenticatedRequest, res: Response) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: `You are not logged in! ` });
  };

  return res.json({ user });
};

export async function updateUser(req: AuthenticatedRequest, res: Response) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: `You are not logged in! ` });
  };

  const { name } = req.body;

  await db
    .update(usersTable)
    .set({ name })
    .where(eq(usersTable.id, user.id));

  return res.json({ status: 'success', name });
};
