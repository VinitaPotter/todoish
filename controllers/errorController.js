const AppError = require("../utils/appErrors");

const handleDBCastError = (err) => {
  let message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDBDuplicateFields = (err) => {
  let value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  let message = `Duplicate field value: ${value[0]}`;
  return new AppError(message, 400);
};

const handleDBValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  let message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 🎆", err);
    res.status(500).json({
      status: "Error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV == "development") {
    devError(err, res);
  } else if (process.env.NODE_ENV == "prouction") {
    let error = { ...err };
    if (error.name == "CastError") error = handleDBCastError(error);
    if (error.code == 11000) error = handleDBDuplicateFields(error);
    if (error.name == "ValidationError") error = handleDBValidationError(error);
    prodError(error, res);
  }
};
