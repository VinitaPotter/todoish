const User = require("../models/userModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");

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

exports.createUser = async (req, res) => {
  let userTodo = await User.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      user: userTodo,
    },
  });
};

exports.getUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findOneAndDelete(req.params.id, req.body);
    res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
