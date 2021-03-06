const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");

const dotenv = require("dotenv");
const AppError = require("./utils/appErrors");
const globalErrorHandler = require("./controllers/errorController");

const toDoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config({ path: "./config.env" });

app.use(cors());
app.options("*", cors());

app.use(helmet());
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again later",
});

app.use("/api", limiter);
app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ["priority", "status", "dueDate", "email"],
  })
);

app.use(compression());

app.use("/api/v1/todo", toDoRouter);
app.use("/api/v1/user", userRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(__dirname + "/public"));

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server! 👻`, 404));
});

app.use(globalErrorHandler);

let DB = process.env.DB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => console.log(err));

module.exports = app;
