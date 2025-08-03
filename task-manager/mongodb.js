// CRUD create read update delete

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

async function main() {
  const client = await MongoClient.connect(connectionURL);
  const db = client.db(databaseName);

  const latestTask = await db
    .collection("tasks")
    .findOne({ _id: new ObjectId("688ec3a00644743e3f345ad6") });

  const deletedTask = db
    .collection("tasks")
    .deleteOne({ _id: new ObjectId("688ec3a00644743e3f345ad6") });

  deletedTask.then((res) => {
    console.log(res);
  });
}

main().catch(console.error);
