import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 8000;

const app = express();

app.get('/', (_req, res) => {
  res.json({ message: 'Hello from Docker Express App!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
