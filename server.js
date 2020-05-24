const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

app.listen(parseInt(process.env.PORT), () => {
  console.log(`App running on port ${process.env.PORT}`);
});
