import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectMongoDB(connectionURL: string) {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const connection = await mongoose.connect(connectionURL);
  return connection;
};
