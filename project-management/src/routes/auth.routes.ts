import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware';
import { verifyJWT } from '../middlewares/auth.middleware';
import {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  userChangeCurrentPasswordValidator
} from '../validators/index';
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgotPassword,
  getCurrentUser,
  changeCurrentPassword,
  resendEmailVerification
} from '../controllers/auth.controller';

const router = Router();

// unsecured routes
router
  .route('/register')
  .post(userRegisterValidator(), validate, registerUser);
router
  .route('/login')
  .post(userLoginValidator(), validate, loginUser);
router
  .route('/verify-email/:verificationToken')
  .get(verifyEmail);
router
  .route('/refresh-token')
  .post(refreshAccessToken)
router
  .route('/forgot-password')
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest)
router
  .route('/reset-password/:resetToken')
  .post(userResetForgotPasswordValidator, validate, resetForgotPassword)

// secured routes
router
  .route('/logout')
  .post(verifyJWT, logoutUser);
router
  .route('/current-user')
  .post(verifyJWT, getCurrentUser);
router
  .route('/change-password')
  .post(verifyJWT, userChangeCurrentPasswordValidator(), validate, changeCurrentPassword);
router
  .route('/resend-email-verification')
  .post(verifyJWT, resendEmailVerification);

export default router;
