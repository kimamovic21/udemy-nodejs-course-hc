import express from 'express';
import { ensureAuth, restrictToRole } from '../middlewares/auth.middleware';
import { getAllUsers } from '../controllers/admin.controller';

const router = express.Router();

const adminRestrictMiddleware = restrictToRole('ADMIN');

router.use(ensureAuth);
router.use(adminRestrictMiddleware);

router.get('/users', getAllUsers);

export default router;