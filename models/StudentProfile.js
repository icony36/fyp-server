const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  course: {
    type: String,
    required: [true, "Course is required."],
  },
  enrollments: [
    {
      name: String,
      id: String,
    },
  ],
  outstandingFee: {
    type: Number,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Student ID is required."],
    cast: [null, (value) => `${value} is not a valid student id.`],
  },
});

const Knowledge = mongoose.model("StudentProfile", studentProfileSchema);

module.exports = Knowledge;
