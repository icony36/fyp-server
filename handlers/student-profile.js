const db = require("../models");
const samples = require("../samples");

exports.getStudentProfiles = async function (req, res, next) {
  try {
    const profiles = await db.StudentProfile.find({});

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: profiles });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getStudentProfile = async function (req, res, next) {
  try {
    const id = req.params.id;

    const profile = await db.StudentProfile.findById(id).populate("studentId");

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: profile });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getStudentProfilesByUser = async function (req, res, next) {
  try {
    const id = req.params.id;

    const profile = await db.StudentProfile.findOne({
      studentId: id,
    }).populate("studentId");

    if (!profile) {
      return next({
        status: 422,
        message: "The user id does not have a student profile.",
      });
    }

    return res
      .status(200)
      .json({ message: `Data retrived succesfully.`, data: profile });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.createStudentProfile = async function (req, res, next) {
  try {
    const student = await db.User.findById(req.body.studentId);

    if (!student) {
      return next({
        status: 422,
        message: "The student id does not exist.",
      });
    }

    if (student.role != "student") {
      return next({
        status: 422,
        message: "The student id is not a student.",
      });
    }

    await db.StudentProfile.create(req.body);

    return res
      .status(200)
      .json({ message: "Student account created successfully." });
  } catch (err) {
    if (err.name == "ValidationError") {
      const messageParts = err.message.split(": ");

      if (messageParts[2].includes(", ")) {
        err.message = "Please fill in required fields.";
      } else {
        err.message = messageParts[2];
      }
    }

    console.log(err);

    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.updateStudentProfile = async function (req, res, next) {
  try {
    const id = req.params.id;

    await db.StudentProfile.findByIdAndUpdate(
      id,
      { ...req.body },
      { useFindAndModify: false }
    );

    return res
      .status(200)
      .json({ message: `Student account successfully updated.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.updateOwnStudentProfile = async function (req, res, next) {
  try {
    const id = req.params.id;

    await db.StudentProfile.findOneAndUpdate(
      { studentId: id },
      { ...req.body },
      { useFindAndModify: false }
    );

    return res
      .status(200)
      .json({ message: `Student profile successfully updated.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteStudentProfile = async function (req, res, next) {
  try {
    const id = req.params.id;

    const profile = await db.StudentProfile.findById(id);

    if (!profile) {
      return next({
        status: 422,
        message: "Student profile does not exist.",
      });
    }

    await profile.deleteOne();

    return res.status(200).json({ message: `Student profile deleted.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteStudentProfilesByUser = async function (req, res, next) {
  try {
    const id = req.params.id;

    await db.StudentProfile.deleteMany({ studentId: id });

    return res.status(200).json({ message: `All student profiles deleted.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.insertSamples = async function (req, res, next) {
  try {
    await db.StudentProfile.updateMany(
      {},
      {
        timetable: samples.timetable,
      }
    );

    return res
      .status(200)
      .json({ message: `All student profiles inserted timetable.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
