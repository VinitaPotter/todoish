const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  let users = await User.find();
  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
};

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
