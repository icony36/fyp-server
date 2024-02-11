const db = require("../models");

exports.getTraining = async function (req, res, next) {
  try {
    const training = await db.TrainingData.findOne();

    if (!training) {
      return next({
        status: 400,
        message: "The training data is not created yet.",
      });
    }

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: training });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.createTraining = async function (req, res, next) {
  try {
    await db.TrainingData.create(req.body);

    return res
      .status(200)
      .json({ message: "Training data created successfully." });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.updateTraining = async function (req, res, next) {
  try {
    await db.TrainingData.updateOne({}, req.body);

    return res
      .status(200)
      .json({ message: "Training data updated successfully!" });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteTraining = async function (req, res, next) {
  try {
    await db.TrainingData.deleteOne({});

    return res
      .status(200)
      .json({ message: "Training data updated successfully!" });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
