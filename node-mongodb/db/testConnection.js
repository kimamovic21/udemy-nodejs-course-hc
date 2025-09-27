import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectionURL = process.env.DATABASE_URL;

mongoose.connect(connectionURL, { ssl: true, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err);
    process.exit(1);
  });
