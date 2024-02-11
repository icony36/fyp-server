const mongoose = require("mongoose");

const trainingDataSchema = new mongoose.Schema(
  {
    intents: [],
    responses: [],
    nodes: [],
    edges: [],
    config: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// keep only one document in this collection
trainingDataSchema.post("save", async function (next) {
  try {
    const records = await TrainingData.find({});

    if (records.length > 1) {
      await TrainingData.deleteMany({ _id: { $ne: records[0]._id } });
    }
  } catch (err) {
    console.log(err);
  }
});

const TrainingData = mongoose.model("TrainingData", trainingDataSchema);

module.exports = TrainingData;
