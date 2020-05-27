const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please type a password"],
      minlength: 8,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      minlength: 8,
      validate: {
        validator: function (current_password) {
          return current_password === this.password;
        },
        message: "Passwords are not the same",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { createdAt: "created_at" },
  }
);

userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = new mongoose.model("User", userScheme);

module.exports = User;
