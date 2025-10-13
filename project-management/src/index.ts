import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Project Management API!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
