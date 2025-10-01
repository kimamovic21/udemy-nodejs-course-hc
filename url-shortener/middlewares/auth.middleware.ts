import { type Request, type Response, type NextFunction } from 'express';
import { validateUserToken } from '../utils/token';

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return next();

  if (!authHeader.startsWith('Bearer')) {
    return res
      .status(401)
      .send({ error: `Authorization header must start with Bearer!` });
  };

  const [bearer, token] = authHeader.split(' ');

  try {
    const payload = await validateUserToken(token as string);

    (req as any).user = payload;

    next();
  } catch (err) {
    return res
      .status(401)
      .send({ error: `Invalid or expired token!` });
  };
};

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(req as any).user || !(req as any).user.id) {
    return res
      .status(401)
      .json({ error: `You must be logged in to access this resource!` });
  };

  next();
};