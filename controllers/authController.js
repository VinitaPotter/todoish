const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appErrors");
const sendEmail = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  let userData = _.pick(req.body, [
    "name",
    "email",
    "password",
    "confirmPassword",
  ]);
  const newUser = await User.create(userData);

  let token = signToken(newUser._id);
  res.status(201).json({
    status: "Success!",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide login credentials", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  let token = signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("This user does not exist", 401));
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed the password. Please log in again",
        401
      )
    );
  }
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission for this action", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with that email id", 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Use ${resetUrl} to reset your password!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset for Todoish. (Valid for 15 mins)",
      message: message,
    });
    res.status(200).json({
      status: "Success",
      message: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending email. Please try again later",
        500
      )
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  console.log(hashedToken);

  if (!user) {
    return next(new AppError("This token is not valid", 403));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  let token = signToken(user._id);
  res.status(201).json({
    status: "Success!",
    token,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("The password your entered is not correct", 403));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  await user.save();
  let token = signToken(user._id);
  res.status(201).json({
    status: "Success!",
    token,
  });
});
