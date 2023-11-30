const jwt = require("jsonwebtoken");

exports.loginRequired = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, function (err, payload) {
      if (payload) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please sign in first.",
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please sign in first.",
    });
  }
};

exports.ensureCorrectUser = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, function (err, payload) {
      if (payload && payload.id == req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized.",
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized.",
    });
  }
};

exports.ensureCorrectRole = function (allowedRoles = []) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, function (err, payload) {
        if (payload && allowedRoles.includes(payload.role)) {
          return next();
        } else {
          return next({
            status: 401,
            message: "Unauthorized role.",
          });
        }
      });
    } catch (err) {
      return next({
        status: 401,
        message: "Unauthorized role.",
      });
    }
  };
};
