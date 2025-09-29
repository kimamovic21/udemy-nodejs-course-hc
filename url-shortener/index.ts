import express, { type Request, type Response } from 'express';
import userRouter from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: `URL Shortener API` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
