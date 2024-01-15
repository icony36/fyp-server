const mongoose = require("mongoose");

const trainingDataSchema = new mongoose.Schema({
  intents: [],
  responses: [],
  nodes: [],
  edges: [],
});

const TrainingData = mongoose.model("TrainingData", trainingDataSchema);

module.exports = TrainingData;
