const Todo = require("../models/todoModel");
const _ = require("lodash");

class APIFeatures {
  constructor(Mquery, Rquery) {
    (this.query = Mquery), (this.Rquery = Rquery);
  }
  filter() {
    let filterQuery = _.pick(this.Rquery, ["priority", "status", "dueDate"]);

    const queryString = JSON.stringify(filterQuery).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  sort() {
    if (this.Rquery.sort) {
      let soryBy = this.Rquery.sort.split(",").join(" ");
      this.query = this.query.sort(soryBy);
    }
    return this;
  }

  limitFields() {
    if (this.Rquery.fields) {
      let fields = this.Rquery.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    let pageNumber = this.Rquery.page * 1 || 1;
    let pageLimit = this.Rquery.limit * 1 || 100;
    let skip = (pageNumber - 1) * pageLimit;

    this.query = this.query.skip(skip).limit(pageLimit);

    return this;
  }
}

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
