const mongoose = require('mongoose');

let db = null;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    db = mongoose.connection.db; // Get the native MongoDB database object
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    console.log(`Database Name: ${mongoose.connection.name}`);
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

async function getDB() {
  if (!db) {
    console.log("MongoDB connection not found, connecting...");
    await connectMongoDB();
  }
  return db;
}

module.exports = { connectMongoDB, getDB };