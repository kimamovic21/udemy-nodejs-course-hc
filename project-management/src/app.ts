import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthCheckRouter from './routes/healthcheck.routes';
import authRouter from './routes/auth.routes';

dotenv.config();

const app = express();

app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));
app.use(express.static('public'));
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRouter);

export default app;