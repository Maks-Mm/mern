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
