const mongoose = require("mongoose");

// config for mongoose
mongoose.set("debug", true);
mongoose.Promise = Promise;
// connect database
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fyp", {
  keepAlive: true,
});

module.exports.User = require("./user");
module.exports.Knowledge = require("./knowledge");
module.exports.Ticket = require("./ticket");
module.exports.StudentProfile = require("./studentprofile");
