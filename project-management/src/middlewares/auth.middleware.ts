import { User } from '../models/user.model';
import { asyncHandler } from '../utils/async-handler';
import ApiError from '../utils/api-error';
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(401, 'Unauthorized request')
  };

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User
      .findById(
        (typeof decodedToken === 'object' && '_id' in decodedToken) ?
          (decodedToken as any)._id : undefined
      )
      .select('-password -refreshToken, -emailVerificationToken -emailVerificationExpiry');

    if (!user) {
      throw new ApiError(401, 'Invalid access token!');
    };

    (req as any).user = user;

    next();
  } catch (err) {
    console.error(err);
    throw new ApiError(401, 'Invalid access token!');
  };
});