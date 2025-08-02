// CRUD create read update delete

const { error } = require("console");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

async function main() {
  const client = await mongoClient.connect(connectionURL);
  const db = client.db(databaseName);
  db.collection("users").insertOne({
    name: "Owen Dev",
    age: 26,
  });
}

main().catch(console.error);
