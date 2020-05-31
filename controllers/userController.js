const _ = require("lodash");

const User = require("../models/userModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appErrors");

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
  let user = await User.findOne({ _id: req.params.id });
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
