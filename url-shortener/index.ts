import express, { type Request, type Response } from 'express';
import { authenticationMiddleware } from './middlewares/auth.middleware';
import userRouter from './routes/user.routes';
import urlRouter from './routes/url.routes';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use(authenticationMiddleware);

app.use('/user', userRouter);
app.use('/', urlRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: `URL Shortener API` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
