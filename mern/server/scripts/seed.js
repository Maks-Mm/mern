import mongoose from "mongoose";
import RecordModel from "../models/RecordModel.js"; // Adjust the path as necessary
import dotenv from "dotenv";

dotenv.config(); // Ensure this line is present

const ATLAS_URI = process.env.ATLAS_URI;
console.log("ATLAS_URI:", ATLAS_URI); // This should log your MongoDB URI
const seedRecords = async () => {
  try {
    // Check if the URI is correctly loaded
    if (!ATLAS_URI) {
      throw new Error("ATLAS_URI is not defined in the .env file");
    }

    // Connect to MongoDB
    await mongoose.connect(ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB!");

    // Create sample records
    const records = [
      { name: "John Doe", position: "Developer", level: "Senior" },
      { name: "Alice Smith", position: "Manager", level: "Intermediate" },
      { name: "Bob Johnson", position: "Intern", level: "Junior" },
    ];

    // Insert records into the database
    await RecordModel.insertMany(records);
    console.log("Records inserted!");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (err) {
    console.error("Error seeding records:", err);
  }
};

seedRecords();
