const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let clientPromise;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

async function getDatabase() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DATABASE);
}

module.exports = { getDatabase, clientPromise };
