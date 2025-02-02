import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import records from "./routes/record.js";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5050;
console.log("ATLAS_URI:", process.env.ATLAS_URI);


const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

//app.use(cors());
app.use(express.json());
app.use("/record", records);

// ✅ Connect to MongoDB with Mongoose
mongoose
  .connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB!");

    // ✅ Start the server ONLY after a successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });









/*
import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

console.log("ATLAS_URI:", process.env.ATLAS_URI);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend
app.use(express.json());
app.use("/record", records);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

*/