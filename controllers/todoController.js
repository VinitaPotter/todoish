const Todo = require("../models/todoModel");
const _ = require("lodash");
const APIFeatures = require("./../utils/apiFeatures");

exports.levelUp = (req, res, next) => {
  req.query.dueDate = { lte: new Date().toISOString() };

  next();
};

exports.getAllItems = async (req, res) => {
  const features = new APIFeatures(Todo.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  let todos = await features.query;
  res.status(200).json({
    status: "Success",
    results: todos.length,
    data: {
      todos,
    },
  });
};

exports.createAnItem = async (req, res) => {
  let newTodo = await Todo.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      todo: newTodo,
    },
  });
};

exports.getAnItem = async (req, res) => {
  try {
    let todo = await Todo.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {
        todo: todo,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAnItem = async (req, res) => {
  try {
    let todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        todo: todo,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAnItem = async (req, res) => {
  try {
    let todo = await Todo.findOneAndDelete(req.params.id, req.body);
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
