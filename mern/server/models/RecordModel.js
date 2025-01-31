import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const RecordModel = mongoose.model("Record", RecordSchema);

export default RecordModel;
