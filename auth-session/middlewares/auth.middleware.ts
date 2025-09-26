import { type Request, type Response, type NextFunction } from 'express';
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

export async function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: `You must be authenticated! ` });
  };

  next();
};

export function restrictToRole(role) {
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.user.role !== role) {
      return res
        .status(401)
        .json({ error: `You are not authorized to access this resource!` });
    };

    return next();
  };
};