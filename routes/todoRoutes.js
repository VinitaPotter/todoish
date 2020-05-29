const express = require("express");
const todoController = require("../controllers/todoController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/pending-for-levelup")
  .get(todoController.levelUp, todoController.getAllItems);
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
