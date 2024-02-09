const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
  course: {
    type: String,
    required: [true, "Course is required."],
  },
  enrollments: { type: Array, required: [true, "Enrollment is required."] },
  outstandingFee: {
    type: Number,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Student ID is required."],
    cast: [null, (value) => `${value} is not a valid student id.`],
  },
  timetable: [
    {
      moduleId: { type: String },
      moduleName: { type: String },
      lessonType: { type: String },
      location: { type: String },
      date: { type: String },
      time: { type: String },
    },
  ],
});

const Knowledge = mongoose.model("StudentProfile", studentProfileSchema);

module.exports = Knowledge;
