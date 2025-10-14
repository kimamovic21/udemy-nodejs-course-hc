import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  console.log(chalk.blue('Checking MONGO_URI:'), process.env.MONGO_URI);

  if (!process.env.MONGO_URI) {
    throw new Error(chalk.red('MONGO_URI is not defined in environment variables'));
  };

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green(`MongoDB successfully connected to: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red(`Error connecting to MongoDB: ${error}`));
    throw error;
  };
};

export default connectDB;