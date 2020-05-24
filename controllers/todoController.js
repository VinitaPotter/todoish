const Todo = require("../models/todoModel");
const _ = require("lodash");

exports.getAllItems = async (req, res) => {
  let filterQuery = _.pick(req.query, ["priority", "status"]);

  const queryString = JSON.stringify(filterQuery).replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );

  let query = Todo.find(JSON.parse(queryString));

  if (req.query.sort) {
    let soryBy = req.query.sort.split(",").join(" ");
    query = query.sort(soryBy);
  }

  if (req.query.fiels) {
    let fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
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
