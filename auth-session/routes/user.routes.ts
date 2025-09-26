import express from 'express';
import {
  signUpUser,
  loginUser,
  getCurrentSession,
  updateUser
} from '../controllers/user.controller';
import { currentUserMiddleware } from '../middlewares/currentUserMiddleware';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/', currentUserMiddleware, getCurrentSession);
router.patch('/', currentUserMiddleware, updateUser);

export default router;