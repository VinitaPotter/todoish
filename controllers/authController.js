const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appErrors");
const Email = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const sendToken = (user, statusCode, res) => {
  let token = signToken(user._id);
  const cookie_option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };
  if (process.env.NODE_ENV === "production") cookie_option.secure = true;

  res.cookie("jwt", token, cookie_option);

  user.password = undefined;
  res.status(statusCode).json({
    status: "Success!",
    token,
    data: {
      user: user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  let userData = _.pick(req.body, [
    "name",
    "email",
    "password",
    "confirmPassword",
  ]);

  let code = Math.floor(1000 + Math.random() * 9000);
  userData.confirmCode = code;
  const newUser = await User.create(userData);

  let user_data = _.pick(newUser, [
    "created_at",
    "email",
    "id",
    "name",
    "role",
    "updatedAt",
  ]);

  await new Email(newUser, code).sendWelcome();
  sendToken(user_data, 201, res);

  // const message = `Confirm your email! Use ${code}!`;

  // await sendEmail({
  //   email: newUser.email,
  //   subject: "Email confirmation for Todoish. (Valid for 15 mins)",
  //   message: message,
  // });
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  let { email, code } = req.body;
  const user = await User.findOne({ email }).select("confirmCode");
  if (!user) {
    return next(new AppError("There is no user with that email id", 404));
  } else {
    console.log(user.confirmCode, code);
    if (user.confirmCode == code) {
      user.confirmedEmail = true;
      user.confirmCode = undefined;
      user.save();
      res.status(200).json({
        status: "Success!",
        message: "Email Authenticated successfully",
      });
    } else {
      res.status(401).json({
        status: "Fail!",
        message: "Count not validate email",
      });
    }
  }
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
  sendToken(user, 201, res);
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

exports.access = catchAsync(async (req, res, next) => {
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

  req.query.owner = user._id;

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

  const resetUrl = `https://app-todoish.herokuapp.com/resetPassword/${resetToken}`;
  // const message = `Forgot your password? Use ${resetUrl} to reset your password!`;
  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: "Password Reset for Todoish. (Valid for 15 mins)",
    //   message: message,
    // });

    await new Email(user, resetUrl).sendPasswordReset();

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
  sendToken(user, 201, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("The password your entered is not correct", 403));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  await user.save();
  sendToken(user, 201, res);
});

exports.isExisting = catchAsync(async (req, res) => {
  let email = req.params.email;
  const user = await User.findOne({ email }).select("name");
  res.status(200).json({
    status: user,
  });
});
