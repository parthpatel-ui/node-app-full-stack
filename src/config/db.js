const { MongoClient } = require('mongodb');

// MongoDB connection URL (replace with your connection string)
const url = process.env.mongodb_conn;
const client = new MongoClient(url);

let db;

// Function to connect to MongoDB
const connectToDB = async (dbName) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

// Function to close the database connection
const closeDB = async () => {
  await client.close();
  console.log('Disconnected from MongoDB');
};

module.exports = { connectToDB, closeDB };
