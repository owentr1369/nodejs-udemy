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

  const updatedLatestTask = db
    .collection("tasks")
    .updateOne(
      { _id: new ObjectId("688ec3a00644743e3f345ad6") },
      { $set: { description: "Learning Vue.js (Vue 3)" } }
    );

  updatedLatestTask.then((res) => {
    console.log(res);
  });
}

main().catch(console.error);
