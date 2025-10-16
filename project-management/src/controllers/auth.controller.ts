import { type Request, type Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { sendEmail, emailVerificationMailgenContent } from '../utils/mail';
import { User } from '../models/user.model';
import ApiResponse from '../utils/api-response';
import ApiError from '../utils/api-error';

export async function generateAccessAndRefreshTokens(userId: string) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    };

    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user?.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    console.error(err);
    throw new ApiError(500, 'Something went wrong while generating access token!');
  };
};

export const registerUser = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const { email, username, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    throw new ApiError(
      409,
      'User with email or username already exists. Please try again!',
      []
    );
  };

  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  const {
    unHashedToken,
    hashedToken,
    tokenExpiry
  } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = new Date(tokenExpiry);

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: 'Please verify your email',
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unHashedToken}`
    ),
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering a user');
  };

  return res
    .status(201)
    .json(new ApiResponse(
      201,
      'User registered successfully and verification email has been sent on your email',
      { user: createdUser }
    ));
});