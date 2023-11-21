function errorHandler(err, req, res, next){
    return res.status(err.status || 500).json({
        error: {
            message: err.message || "Sorry! Something went wrong."
        }
    });
}

module.exports = errorHandler;