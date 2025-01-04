const { MongoClient, ObjectId } = require('mongodb');
const { connectToDB, closeDB } = require('../config/db');

// Database and Collection Name
const dbName = 'database';
const collectionName = 'todolist';

async function getDocumentById(req, res) {
    try {
        // Access the database and collection
        const db = await connectToDB(dbName);
        const collection = db.collection(collectionName);

        // Find the document by `_id`
        const document = await collection.findOne({ _id: new ObjectId(req.params.id), active : true });
        res.status(200).json(document);

    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: 'Something went wrong', success: false });
    } finally {
        // Close the connection
        await closeDB();
    }
}

async function getAllDocuments(req, res) {
    try {
        // Access the database and collection
        const db = await connectToDB(dbName);
        const collection = db.collection(collectionName);

        // Get all documents
        const documents = await collection.find({ active : true }).toArray(); // Convert cursor to array
        res.status(200).json(documents);

    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: 'Something went wrong', success: false });
    } finally {
        await closeDB();
    }
}

module.exports = {
    getAllDocuments,
    getDocumentById,
};