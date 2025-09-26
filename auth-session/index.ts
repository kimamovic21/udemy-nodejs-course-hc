import express, { type Request, type Response } from 'express';
import { authMiddleware } from './middlewares/auth.middleware';
import userRouter from './routes/user.routes';
import adminRouter from './routes/admin.routes';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(authMiddleware);

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Auth Session Express.js App' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});