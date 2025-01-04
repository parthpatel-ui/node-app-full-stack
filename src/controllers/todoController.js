const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI (replace with your URI)
const uri = process.env.mongodb_conn;

// Database and Collection Name
const dbName = 'database';
const collectionName = 'todolist';

async function getDocumentById(req, res) {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Find the document by `_id`
        const document = await collection.findOne({ _id: new ObjectId(req.params.id), active : true });
        res.status(200).json(document);

    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error, success: false });
    } finally {
        // Close the connection
        await client.close();
    }
}

async function getAllDocuments(req, res) {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Get all documents
        const documents = await collection.find({ active : true }).toArray(); // Convert cursor to array
        res.status(200).json(documents);

    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error, success: false });
    } finally {
        // Close the connection
        await client.close();
    }
}

module.exports = {
    getAllDocuments,
    getDocumentById,
};