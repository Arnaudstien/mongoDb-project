import "dotenv/config";
import { MongoClient } from "mongodb";

const databaseUrl = process.env.MONGODB_DATABASE_URL || "";
const client = new MongoClient(databaseUrl);
client.connect().then(async (client) => {
  const db = client.db();

  await db.createCollection("Movies");
  db.createCollection("Movies", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["Title", "type", "synopsis"],
        properties: {
          _id: { bsonType: "objectId" },
          Title: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          Type: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          Synopsis: {
            bsonType: "string",
            description: "must be an integer > 18 and is required",
          },
        },
      },
    },
  });

  //const newUsers = [
  //   {
  //     Title: "Francis",
  //     Type: "Ewlines",
  //     synopsis: "francis@fewlines.co",
  //   },

  //   {
  //     Title: "Farida",
  //     Type: "Ewlines",
  //     Synopsis: "farida@fewlines.co",
  //   },
  // ];
  // db.collections("Movies").insertMany(newUsers);

  client.close();
});
