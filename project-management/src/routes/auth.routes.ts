import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validator.middleware';
import { userRegisterValidator, userLoginValidator } from '../validators/index';

const router = Router();

router
  .route('/register')
  .post(userRegisterValidator(), validate, registerUser);
router
  .route('/login')
  .post(userLoginValidator(), validate, loginUser);

export default router;
