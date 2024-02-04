const mongoose = require("mongoose");

const trainingDataSchema = new mongoose.Schema({
  intents: [],
  responses: [],
  nodes: [],
  edges: [],
  config: String,
});

const TrainingData = mongoose.model("TrainingData", trainingDataSchema);

module.exports = TrainingData;
