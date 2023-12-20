const mongoose = require("mongoose");

const trainingDataSchema = new mongoose.Schema({
  pipeline: [String],
  policies: [String],
  intents: [String],
  entities: [String],
  actions: [String],
  forms: {},
  responses: [],
});

const TrainingData = mongoose.model("TrainingData", trainingDataSchema);

module.exports = TrainingData;
