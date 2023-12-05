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
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  firstName: {
    type: String,
    required: [true, "First name is required."],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
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

userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      const hashedPassword = await bcrypt.hash(this._update.password, 10);
      this._update.password = hashedPassword;

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
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // delete all the StudentProfile with this user
      await mongoose.model("StudentProfile").deleteMany({ studentId: this.id });

      // delete all the Ticket with this user
      await mongoose.model("Ticket").deleteMany({ studentId: this.id });

      return next();
    } catch (err) {
      return next(err);
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
