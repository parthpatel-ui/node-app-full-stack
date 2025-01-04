const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://parthpatel:3yI4S2%24R%24VKBiv%25o@cluster0.wcv1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await client.close();
  }
}

connectDB();
