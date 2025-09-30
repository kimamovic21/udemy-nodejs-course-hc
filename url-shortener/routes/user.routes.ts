import express from 'express';

const router = express.Router();

import { signUpUser, loginUser } from '../controllers/user.controller';

router.post('/signup', signUpUser);
router.post('/login', loginUser);

export default router;