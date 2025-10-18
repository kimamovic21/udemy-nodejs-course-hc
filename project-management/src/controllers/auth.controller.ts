import { type Request, type Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { sendEmail, emailVerificationMailgenContent, forgotPasswordMailgenContent } from '../utils/mail';
import { User } from '../models/user.model';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
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


export const loginUser = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const { email, password, username } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required!');
  };

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, 'User does not exists!');
  };

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid credentials!');
  };

  const {
    accessToken,
    refreshToken
  } = await generateAccessAndRefreshTokens(String(user._id));

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        'User logged in successfully!',
        { user: loggedInUser, accessToken, refreshToken }
      ),
    );
});


export const logoutUser = asyncHandler(async (
  req: Request,
  res: Response
) => {
  await User.findByIdAndUpdate(
    (req as any).user._id,
    {
      $set: {
        refreshToken: '',
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, 'User logged out', {}));
});


export const getCurrentUser = asyncHandler(async (
  req: Request,
  res: Response
) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Current user fetched successfully',
        { user: (req as any).user }
      ),
    );
});


export const verifyEmail = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiError(400, 'Email verification token is missing!');
  };

  let hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Token is invalid or expired!');
  };

  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  user.isEmailVerified = true;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Email is verified', { isEmailVerified: true }),
    );
});


export const resendEmailVerification = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user?._id;
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User does not exists!');
  };

  if (user.isEmailVerified) {
    throw new ApiError(409, 'Email is already verified!');
  };

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
    subject: 'Please verify your email!',
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'Mail has been sent yo your email!', {}));
});


export const refreshAccessToken = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized access!');
  };

  try {
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET
    );

    let userId: string | undefined;

    if (
      typeof decodedRefreshToken === 'object' &&
      decodedRefreshToken !== null &&
      '_id' in decodedRefreshToken
    ) {
      userId = (decodedRefreshToken as any)._id;
    };

    const user = userId ? await User.findById(userId) : null;

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token!');
    };

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token has expired!');
    };

    const options = {
      httpOnly: true,
      secure: true
    };

    const {
      accessToken,
      refreshToken: newRefreshToken
    } = await generateAccessAndRefreshTokens(String(user._id));

    user.refreshToken = newRefreshToken;

    await user.save();

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          'Access token refreshed successfully!',
          { accessToken, refreshToken: newRefreshToken },
        ),
      );
  } catch (err) {
    console.error(err);
    throw new ApiError(401, 'Invalid refresh token!');
  };
});


export const forgotPasswordRequest = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User does not exists!');
  };

  const {
    unHashedToken,
    hashedToken,
    tokenExpiry
  } = user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = new Date(tokenExpiry);

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: 'Password reset request',
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`,
    ),
  });

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      'Password reset mail has been sent on your mail',
      {}
    ));
});


export const resetForgotPassword = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  let hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(489, 'Token is invalid or expired!');
  };

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Password reset successfully!', {}),
    );
});


export const changeCurrentPassword = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById((req as any).user?._id);

  const isPasswordValid = await user?.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid old password');
  };

  if (user) {
    user.password = newPassword;
  };

  await user?.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Password changed successfully',
        {},
      ),
    );
});