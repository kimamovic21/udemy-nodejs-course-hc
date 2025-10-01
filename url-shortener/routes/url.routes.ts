import express from 'express';
import {
  createShortenURL,
  getShortenURL,
  getAllUserURLs
} from '../controllers/url.controllers';
import { ensureAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/shorten-url', ensureAuth, createShortenURL);
router.get('/codes', ensureAuth, getAllUserURLs);
router.get('/:shortCode', getShortenURL);

export default router;