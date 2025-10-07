import express from 'express';

const PORT = process.env.PORT ?? 8000;

const app = express();

app.get('/', (_req, res) => {
  res.json({ message: 'Hello from Docker Express App!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
