const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    details: {
      type: String,
      required: [true, "Details is required."],
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student Id is required."],
      cast: [null, (value) => `${value} is not a valid student id.`],
    },
    status: {
      type: String,
      enum: ["pending", "solved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
