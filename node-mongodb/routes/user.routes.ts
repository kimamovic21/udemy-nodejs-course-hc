import express from 'express';
import {
  loginUser,
  signUpUser,
  updateUserProfile
} from '../controller/user.controller';
import { ensureAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.patch('/', ensureAuth, updateUserProfile);

export default router;