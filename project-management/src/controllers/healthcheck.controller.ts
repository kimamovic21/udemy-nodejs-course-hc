import { type Request, type Response } from 'express';
import ApiResponse from '../utils/api-response';

export function healthCheck(req: Request, res: Response) {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, 'Server is running'));
  } catch (err) {
    console.error(err);
  };
};