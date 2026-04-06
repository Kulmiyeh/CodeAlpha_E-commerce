import mongoose from 'mongoose';

export let isDbConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn('⚠️  MONGODB_URI is not defined in environment variables.');
      console.warn('The application is currently running with MOCK DATA fallback.');
      console.warn('To use a real database, please provide a MongoDB Atlas connection string in the Settings menu.');
      return;
    }

    if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
      console.error('❌ MONGODB_URI points to localhost/127.0.0.1.');
      console.error('Local MongoDB instances are not accessible in this cloud environment.');
      console.error('Please use a cloud-hosted MongoDB (e.g., MongoDB Atlas).');
      isDbConnected = false;
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    isDbConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error instanceof Error ? error.message : String(error)}`);
    isDbConnected = false;
    // Do not exit process in development, allow the server to run so the user can see instructions
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
