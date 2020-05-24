const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();

router
  .route("/")
  .get(todoController.getAllItems)
  .post(todoController.createAnItem);
router
  .route("/:id")
  .get(todoController.getAnItem)
  .patch(todoController.updateAnItem)
  .delete(todoController.deleteAnItem);

module.exports = router;
