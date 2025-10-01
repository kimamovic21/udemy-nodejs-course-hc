import express from 'express';
import { createShortenURL } from '../controllers/url.controllers';
import { ensureAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', ensureAuth, createShortenURL);

export default router;