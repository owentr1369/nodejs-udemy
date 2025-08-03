// CRUD create read update delete

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId();

console.log(id);
console.log(id.getTimestamp());

async function main() {
  const client = await MongoClient.connect(connectionURL);
  const db = client.db(databaseName);

  const res = await db.collection("tasks").insertMany([
    {
      description: "Learn Vue.js",
      completed: false,
      _id: id,
    },
  ]);
}

main().catch(console.error);
