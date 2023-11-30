const db = require("../models");

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

exports.getStudentProfileByUser = async function (req, res, next) {
  try {
    const id = req.params.id;

    const profiles = await db.StudentProfile.find({ studentId: id }).populate(
      "studentId"
    );

    return res
      .status(200)
      .json({ message: `Data retrived succesfully.`, data: profiles });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.createStudentProfile = async function (req, res, next) {
  try {
    await db.StudentProfile.create(req.body);

    return res
      .status(200)
      .json({ message: "Student profile created successfully." });
  } catch (err) {
    if (err.name == "ValidationError") {
      const messageParts = err.message.split(": ");

      err.message = messageParts[2];
    }

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
        message: "Student profile is not exist.",
      });
    }

    await profile.remove();

    return res.status(200).json({ message: `Student profile deleted.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};