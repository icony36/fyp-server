const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    labels: {
      type: [String],
      validate: [(v) => Array.isArray(v) && v.length > 0, "Label is required."],
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

knowledgeSchema.index({ title: "text" });

const Knowledge = mongoose.model("Knowledge", knowledgeSchema);

module.exports = Knowledge;
