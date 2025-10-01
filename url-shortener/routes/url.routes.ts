import express from 'express';
import { createShortenURL, getShortenURL } from '../controllers/url.controllers';
import { ensureAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/shorten-url', ensureAuth, createShortenURL);
router.get('/:shortCode', getShortenURL);

export default router;