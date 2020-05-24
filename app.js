const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const toDoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config({ path: "./config.env" });
app.use(express.json());

app.use("/api/v1/todo", toDoRouter);
app.use("/api/v1/user", userRouter);

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
