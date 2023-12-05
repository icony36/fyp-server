const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

knowledgeSchema.index({ title: "text" });

const Knowledge = mongoose.model("Knowledge", knowledgeSchema);

module.exports = Knowledge;
