const Todo = require("../models/todoModel");

const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appErrors");

exports.levelUp = (req, res, next) => {
  req.query.dueDate = { lte: new Date().toISOString() };

  next();
};

exports.getAllItems = catchAsync(async (req, res, next) => {
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
});

exports.createAnItem = catchAsync(async (req, res, next) => {
  let newTodo = await Todo.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      todo: newTodo,
    },
  });
});

exports.getAnItem = catchAsync(async (req, res, next) => {
  let todo = await Todo.findOne({ _id: req.params.id });
  if (!todo) {
    return next(new AppError("Nothing found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      todo: todo,
    },
  });
});

exports.updateAnItem = catchAsync(async (req, res, next) => {
  let todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return next(new AppError("Nothing found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      todo: todo,
    },
  });
});

exports.deleteAnItem = catchAsync(async (req, res, next) => {
  let todo = await Todo.findOneAndDelete(req.params.id, req.body);
  if (!todo) {
    return next(new AppError("Nothing found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    data: null,
  });
});
