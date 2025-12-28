import mongoose from 'mongoose';

const database = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB connected');

    console.log('📦 DB Name:', mongoose.connection.name);
  } catch (error) {
    console.error('MongoDB error:', error.message);
    process.exit(1);
  }
};

export default database;
