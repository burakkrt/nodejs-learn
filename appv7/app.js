// MongoDB 'ye bağlanmamızı sağlayan bir sınıf.
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://krtburak:WbgEYwI27hEWZKQP@cluster0.pckcbvj.mongodb.net/";

const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    const database = client.db("testdb1");
    const ratings = database.collection("users");
    const cursor = ratings.find();
    await { name: "burak" };
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
