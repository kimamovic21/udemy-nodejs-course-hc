import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function currentUserMiddleware(
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
        .json({ error: `Authorization header must start with Bearer` });
    };

    const token = tokenHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded;
    next();
  } catch (error) {
    next();
  };
};