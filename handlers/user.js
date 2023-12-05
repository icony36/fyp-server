const db = require("../models");

exports.getUser = async function (req, res, next) {
  try {
    const id = req.params.id;

    const user = await db.User.findById(id);

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: user });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getUsers = async function (req, res, next) {
  try {
    const users = await db.User.find({});

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: users });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.updateUser = async function (req, res, next) {
  const id = req.params.id;

  try {
    await db.User.findByIdAndUpdate(id, { ...req.body });

    return res.status(200).json({ message: `User successfully updated.` });
  } catch (err) {
    // if validation fail
    if (err.code === 11000) {
      err.message = "Sorry, the username is used.";
    }

    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.updateProfile = async function (req, res, next) {
  const id = req.params.id;

  try {
    // prevent changing role
    if (!req.body.role) {
      delete req.body.role;
    }

    // prevent changing status
    if (!req.body.isSuspended) {
      delete req.body.isSuspended;
    }

    await db.User.findByIdAndUpdate(id, { ...req.body });

    return res.status(200).json({ message: `Profile successfully updated.` });
  } catch (err) {
    // if validation fail
    if (err.code === 11000) {
      err.message = "Sorry, the username is used.";
    }

    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    const id = req.params.id;

    const user = await db.User.findById(id);

    if (!user) {
      return next({
        status: 422,
        message: "User does not exist.",
      });
    }

    await user.deleteOne();

    return res.status(200).json({ message: `User ${user.username} deleted.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.suspendUser = async function (req, res, next) {
  try {
    const id = req.params.id;
    const { isSuspended } = req.body;

    const user = await db.User.findByIdAndUpdate(id, { isSuspended });

    return res.status(200).json({
      message: `User ${user.username} is ${
        isSuspended ? "suspended" : "unsuspended"
      }.`,
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
