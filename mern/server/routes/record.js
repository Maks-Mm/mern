import express from "express";
import RecordModel from "../models/RecordModel.js"; // ✅ Import Mongoose model

const router = express.Router();

// ✅ Get all records
router.get("/", async (req, res) => {
  try {
    const records = await RecordModel.find(); // Fetch all records
    res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

// ✅ Get a single record by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await RecordModel.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error("Error fetching record:", err);
    res.status(500).json({ message: "Failed to fetch record" });
  }
});

// ✅ Create a new record
router.post("/", async (req, res) => {
  try {
    const newRecord = new RecordModel(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    console.error("Error saving record:", err);
    res.status(500).json({ message: "Failed to save record" });
  }
});

// ✅ Update a record
router.patch("/:id", async (req, res) => {
  try {
    const updatedRecord = await RecordModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(updatedRecord);
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).json({ message: "Failed to update record" });
  }
});

// ✅ Delete a record
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await RecordModel.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ message: "Failed to delete record" });
  }
});

export default router;

/*
import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    if (!result) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching record");
  }
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    if (result.modifiedCount === 0) {
      return res.status(404).send("No records updated");
    }
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("records");
    let result = await collection.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).send("No records deleted");
    }
    res.status(200).send("Record deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;

*/
