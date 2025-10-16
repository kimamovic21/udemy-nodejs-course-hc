import { type Request, type Response, type NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../utils/api-error';

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  };

  const extractedErrors = errors.array().map((err) => {
    if (err.type === 'field') {
      return `${err.path}: ${err.msg}`;
    }
    return err.msg;
  });

  throw new ApiError(422, 'Received data is not valid!', extractedErrors);
};