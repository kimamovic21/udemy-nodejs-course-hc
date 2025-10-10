import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 8000;

const app = express();

app.get('/', (_req, res) => {
  return res.json({ message: 'Hello from Docker Express Redis App!' });
});

app.get('/health', (_req, res) => {
  return res.json({ message: 'I am healthy '});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;