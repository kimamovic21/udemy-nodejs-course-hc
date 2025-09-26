import express from 'express';
import {
  signUpUser,
  loginUser,
  getCurrentSession,
  updateUser
} from '../controllers/user.controller';
import { ensureAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/', ensureAuth, getCurrentSession);
router.patch('/', ensureAuth, updateUser);

export default router;