const mongoose = require("mongoose");

// config for mongoose
mongoose.set("debug", true);
mongoose.Promise = Promise;
// connect database
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fyp", {
  keepAlive: true,
});

module.exports.User = require("./User.js");
module.exports.StudentProfile = require("./StudentProfile.js");
module.exports.Knowledge = require("./Knowledge.js");
module.exports.Ticket = require("./Ticket.js");
