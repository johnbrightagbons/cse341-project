const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('your-mongodb-connection-string')
        .then(client => {
            console.log('Connected to MongoDB');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDatabase = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDatabase = getDatabase;
