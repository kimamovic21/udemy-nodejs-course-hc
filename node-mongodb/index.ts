import express, { type Request, type Response } from 'express';
import { connectMongoDB } from './db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

connectMongoDB(process.env.DATABASE_URL!)
  .then(() => console.log(`MongoDB successfully connected!`))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ msg: 'Welcome to Node.js MongoDB App!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
