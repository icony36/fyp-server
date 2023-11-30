const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  role: {
    type: String,
    enum: ["staff", "student", "admin"],
    required: [true, "Role is required."],
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
});

// hook to hash password before storing and changing role
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;

      return next();
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

// function to check if password is correct
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;
  } catch (err) {
    return next(err);
  }
};

// hook to delete user
userSchema.pre("remove", async function (next) {
  try {
    // Delete all the StudentProfile with this user
    await mongoose.model("StudentProfile").deleteMany({ studentId: this.id });

    // Delete all the Ticket with this user
    await mongoose.model("Ticket").deleteMany({ studentId: this.id });

    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
