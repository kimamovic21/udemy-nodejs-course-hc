import { type Request, type Response } from 'express';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { shortenPostRequestBodySchema } from '../validation/request.validation';
import { urlsTable } from '../models';
import db from '../db';
import 'dotenv/config';

export async function createShortenURL(req: Request, res: Response) {
  const validationResult =
    await shortenPostRequestBodySchema.safeParseAsync(req.body);

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  };

  const { userUrl, userCode } = validationResult.data;

  const shortCodeUser = userCode ?? nanoid(6);

  const [result] = await db.insert(urlsTable).values({
    shortCode: shortCodeUser,
    targetURL: userUrl,
    userId: (req as any).user?.id,
  }).returning({
    id: urlsTable.id,
    shortCode: urlsTable.shortCode,
    targetURL: urlsTable.targetURL,
  });

  return res
    .status(201)
    .json({
      id: result?.id,
      shortCode: result?.shortCode,
      targetURL: result?.targetURL
    });
};

export async function getAllUserURLs(req: Request, res: Response) {
  const userCodes = await db
    .select({
      id: urlsTable.id,
      userId: urlsTable.userId,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
      createdAt: urlsTable.createdAt,
      updatedAt: urlsTable.updatedAt,
    })
    .from(urlsTable)
    .where(eq(urlsTable.userId, (req as any).user?.id));

  if (!userCodes || userCodes.length === 0) {
    return res.status(200).json({ userCodes: [] });
  };

  return res.status(200).json({ userCodes });
};

export async function getShortenURL(req: Request, res: Response) {
  const shortCode = req.params.shortCode;
  const [result] = await db
    .select({
      targetURL: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode as string));

  if (!result) {
    return res.status(404).json({ error: `Short URL not found!` });
  };

  return res.redirect(result.targetURL);
};