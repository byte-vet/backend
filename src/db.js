// db.js

const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; 

// Database name
const dbName = 'ByteVet_DB'; 

// MongoDB client instance
let client;

// Function to connect to the MongoDB database
async function connectToDatabase() {
    try {
        // Create a new MongoDB client instance if not already created
        if (!client) {
            client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect(); // Connect to MongoDB
            console.log('Connected to MongoDB');
        }

        return client.db(dbName); // Return the database instance
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Throw error if unable to connect
    }
}

// Function to close the MongoDB connection
async function closeDatabase() {
    try {
        if (client) {
            await client.close(); // Close the MongoDB client
            console.log('Disconnected from MongoDB');
            client = null; // Reset the client instance
        }
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        throw err; // Throw error if unable to close connection
    }
}

module.exports = { connectToDatabase, closeDatabase };
