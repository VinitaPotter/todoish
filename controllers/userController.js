const _ = require("lodash");
const { promisify } = require("util");

const User = require("../models/userModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appErrors");
const jwt = require("jsonwebtoken");

exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  let users = await features.query;
  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
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
  let user = await User.findById({ _id: decoded.id });
  res.status(200).json({
    status: "Success",
    data: {
      user: user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError("Can not update password here", 403));
  }

  let userData = _.pick(req.body, ["email", "name"]);
  let user = await User.findByIdAndUpdate(req.params.id, userData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "Success",
    data: {
      user: user,
    },
  });
});

exports.deactivate = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "Success",
    data: null,
  });
});
