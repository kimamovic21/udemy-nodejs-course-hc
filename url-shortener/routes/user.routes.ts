import express from 'express';

const router = express.Router();

import { signUpUser } from '../controllers/user.controller';

router.post('/signup', signUpUser);

export default router;