const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

let server = app.listen(parseInt(process.env.PORT), () => {
  console.log(`App running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection!! Shutting now..");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception!! Shutting now..");
  server.close(() => {
    process.exit(1);
  });
});
