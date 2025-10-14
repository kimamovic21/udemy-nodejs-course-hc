import { type Request, type Response } from 'express';
import chalk from 'chalk';
import app from './app';
import connectDB from './db/db';

const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Project Management API!' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green(`Server is running on port: ${PORT}`));
    });
  })
  .catch((err) => {
    console.error(chalk.red(`MongoDB connection error: ${err}`));
    process.exit(1);
  });