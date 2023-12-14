const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Subject is required."],
    },
    detail: {
      type: String,
      required: [true, "Detail is required."],
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student Id is required."],
      cast: [null, (value) => `${value} is not a valid student id.`],
    },
    type: {
      type: String,
      enum: ["open", "close"],
      default: "open",
    },
    status: {
      type: String,
      enum: ["pending-student", "pending-staff", "solved"],
      required: [
        true,
        "Status (pending-student or pending-staff) is required.",
      ],
      default: "pending-staff",
    },
    responses: [
      {
        senderType: {
          type: String,
          enum: ["staff", "student"],
          required: [true, "Sender type (staff or student) is required."],
        },
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Sender Id is required."],
        },
        message: {
          type: String,
          required: [true, "Response message is required."],
        },
        msgAt: {
          type: Date,
          required: true,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
