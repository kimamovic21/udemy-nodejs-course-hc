import { type Request, type Response } from 'express';
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