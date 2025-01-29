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
