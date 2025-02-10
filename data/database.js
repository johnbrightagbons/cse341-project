const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/schoolAPI';

const dbName = 'schoolAPI';
let db;

const connectDB = async () => {
    if (!db) {
        try {
            const client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await client.connect();
            db = client.db(dbName);
            console.log('✅ Connected to MongoDB');
        } catch (error) {
            console.error('❌ Failed to connect to MongoDB', error);
            throw error;
        }
    }
    return db;
};

const getDb = () => {
    if (!db) {
        throw new Error('❌ Database not initialized. Call connectDB first.');
    }
    return db;
};

module.exports = { connectDB, getDb };