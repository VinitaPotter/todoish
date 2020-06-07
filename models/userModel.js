const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
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
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "accountable"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      minlength: 8,
      select: false,
      validate: {
        validator: function (current_password) {
          return current_password === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    confirmedEmail: {
      type: Boolean,
      default: false,
      select: false,
    },
    confirmCode: {
      type: Number,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { createdAt: "created_at" },
  }
);

// userSchema.virtual("todo", {
//   ref: "Todo",
//   foreignField: "owner",
//   localField: "_id",
// });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, async function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidate_password,
  user_password
) {
  return await bcrypt.compare(candidate_password, user_password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return changedAt > JWTTimestamp;
  }
};

userSchema.methods.createPasswordResetToken = function () {
  let resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
