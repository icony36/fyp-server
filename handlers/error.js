function errorHandler(err, req, res, next) {
  return res.status(err.status || 500).json({
    message: err.message || "Server down.",
  });
}

module.exports = errorHandler;
