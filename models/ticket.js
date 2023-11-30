const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  details: {
    type: String,
    required: [true, "Details is required."],
  },
  timestamp: {
    type: Date,
    required: [true, "Timestamp Id is required."],
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Student Id is required."],
  },
  status: {
    type: String,
    enum: ["pending", "solved"],
    default: "pending",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
