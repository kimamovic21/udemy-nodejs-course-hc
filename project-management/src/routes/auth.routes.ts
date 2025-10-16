import { Router } from 'express';
import { registerUser } from '../controllers/auth.controller';
import { validate } from '../middlewares/validator.middleware';
import { userRegisterValidator } from '../validators/index';

const router = Router();

router
  .route('/register')
  .post(userRegisterValidator(), validate, registerUser);

export default router;
