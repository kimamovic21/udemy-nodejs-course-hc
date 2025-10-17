import { Router } from 'express';
import { validate } from '../middlewares/validator.middleware';
import { verifyJWT } from '../middlewares/auth.middleware';
import {
  userRegisterValidator,
  userLoginValidator
} from '../validators/index';
import {
  registerUser,
  loginUser,
  logoutUser
} from '../controllers/auth.controller';

const router = Router();

router
  .route('/register')
  .post(userRegisterValidator(), validate, registerUser);
router
  .route('/login')
  .post(userLoginValidator(), validate, loginUser);
router
  .route('/logout')
  .post(verifyJWT, logoutUser);

export default router;
