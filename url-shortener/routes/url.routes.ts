import express from 'express';
import {
  createShortenURL,
  getShortenURL,
  getAllUserURLs,
  updateShortenURL,
  deleteShortenURL
} from '../controllers/url.controllers';
import { ensureAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/shorten-url', ensureAuth, createShortenURL);
router.get('/codes', ensureAuth, getAllUserURLs);
router.get('/:shortCode', getShortenURL);
router.put('/:id', ensureAuth, updateShortenURL);
router.delete('/:id', ensureAuth, deleteShortenURL);

export default router;