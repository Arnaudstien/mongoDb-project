import "dotenv/config";
import { MongoClient } from "mongodb";

const databaseUrl = process.env.MONGODB_DATABASE_URL || "";
const client = new MongoClient(databaseUrl);
client.connect().then(async (client) => {
  const db = client.db();

  await db.createCollection("newData");
  client.close();
});
