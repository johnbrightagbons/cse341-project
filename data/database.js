const dotenv = require('dotenv');  // Import dotenv
dotenv.config();   // Initialize dotenv

const MongoClient = require('mongodb').MongoClient;   // Import MongoClient

let database;   // Initialize database

const initDb = (callback) => {  // Initialize database
    if (database) {   // Check if database is already initialized
        console.log("Db is already initialized!");  // Log message
        return callback(null, database); // Return callback
    }
    MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to MongoDB
        .then((client) => { // If successful
            database = client.db();     // Set database to client.db()
            callback(null, database);  // Return callback
        })
        .catch((err) => {  // If error
            callback(err); // Return callback
        });
};

const getDatabase = () => { // Get database
    if (!database) { // If database is not initialized
        throw Error('Database not initialized') // Throw error
    }
    return database;  // Return database
};

module.exports = {  // Export module
    initDb,  // Initialize database
    getDatabase  // Get database
};