// CRUD create read update delete

const { error } = require("console");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

async function main() {
  const client = await mongoClient.connect(connectionURL);
  const db = client.db(databaseName);

  const res = await db.collection("users").insertMany([
    {
      name: "John Doe",
      age: 26,
    },
    {
      name: "Jane Doe",
      age: 25,
    },
    {
      name: "John Smith",
      age: 27,
    },
  ]);
  console.log(res);
}

main().catch(console.error);
