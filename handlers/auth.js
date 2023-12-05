const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res, next) {
  try {
    // create user
    const { _id } = await db.User.create(req.body);

    return res
      .status(200)
      .json({ userId: _id, message: "User created successfully." });
  } catch (err) {
    // if validation fail
    if (err.code === 11000) {
      err.message = "Sorry, the username is used.";
    } else if (err.name == "ValidationError") {
      const messageParts = err.message.split(": ");

      if (messageParts[2].includes(", ")) {
        err.message = "Please fill in required fields.";
      } else {
        err.message = messageParts[2];
      }
    }

    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.signin = async function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return next({
      status: 422,
      message: "Please provide username and password.",
    });
  }

  try {
    // find user
    const user = await db.User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return next({
        status: 422,
        message: "This account does not exist.",
      });
    }

    const { id, role, isSuspended } = user;

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      if (isSuspended) {
        return next({
          status: 401,
          message: "This account has been suspended.",
        });
      }

      // create token
      const token = createToken(id, role);

      return res
        .status(200)
        .json({ message: "Logged in successfully.", data: { token } });
    } else {
      return next({
        status: 401,
        message: "Incorrect username or password.",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

function createToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_KEY);
}
