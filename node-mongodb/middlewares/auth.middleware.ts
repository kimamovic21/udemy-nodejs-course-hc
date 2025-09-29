import {
  type Request,
  type Response,
  type NextFunction
} from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tokenHeader = req.headers['authorization'];

    if (!tokenHeader) {
      return next();
    };

    if (!tokenHeader.startsWith('Bearer')) {
      return res
        .status(400)
        .json({ error: `Authorization header must begin with Bearer! ` });
    };

    const token = tokenHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    (req as any).user = decodedToken;

    return next();
  } catch (err) {
    console.error(err);
    next();
  };
};

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(req as any).user) {
    return res
      .status(401)
      .json({ error: `You must be authenticated to access this source ` });
  };

  next();
};