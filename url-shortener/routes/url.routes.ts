import express from 'express';
import { createShortenURL } from '../controllers/url.controllers';

const router = express.Router();

router.post('/', createShortenURL);

export default router;