import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from config.env
dotenv.config({ path: "./config.env" }); // Adjust the path if necessary

const uri = process.env.ATLAS_URI; // Get the connection string from the environment
if (!uri) {
  console.error("Error: ATLAS_URI is not defined in config.env");
  process.exit(1); // Exit if ATLAS_URI is not defined
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("analyzer"); // Adjust the database name if needed
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit on error
  }
}

const db = await connectToMongoDB(); // Use await to get the connected database
export default db;
