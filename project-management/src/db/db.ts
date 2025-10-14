import mongoose from 'mongoose';
import chalk from 'chalk';

async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    console.log(chalk.green('MongoDB successfully connected!'));
  } catch (err: unknown) {
    console.error(chalk.red(err));
    console.error(chalk.red(`MongoDB connection error: ${err}`));
    process.exit(1);
  };
};

export default connectDB;