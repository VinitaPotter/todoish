const Todo = require("../models/todoModel");
const _ = require("lodash");

exports.levelUp = (req, res, next) => {
  req.query.dueDate = { lte: new Date().toISOString() };

  next();
};

exports.getAllItems = async (req, res) => {
  let filterQuery = _.pick(req.query, ["priority", "status", "dueDate"]);
  console.log(req.query);

  const queryString = JSON.stringify(filterQuery).replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  console.log(queryString);
  let query = Todo.find(JSON.parse(queryString));

  if (req.query.sort) {
    let soryBy = req.query.sort.split(",").join(" ");
    query = query.sort(soryBy);
  }

  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  let pageNumber = req.query.page * 1 || 1;
  let pageLimit = req.query.limit * 1 || 100;
  let skip = (pageNumber - 1) * pageLimit;

  query = query.skip(skip).limit(pageLimit);
  if (req.query.page) {
    let totalTodo = await Todo.countDocuments();
    if (skip > totalTodo) {
      throw new Error("This page does not exist");
    }
  }
  let todos = await query;
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
