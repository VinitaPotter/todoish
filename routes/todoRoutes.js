const express = require("express");
const todoController = require("../controllers/todoController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/pending-for-levelup")
  .get(todoController.levelUp, todoController.getAllItems);
router
  .route("/")
  .get(
    authController.protect,
    authController.access,
    todoController.getAllItems
  )
  .post(todoController.createAnItem);
router
  .route("/:id")
  .get(todoController.getAnItem)
  .patch(
    authController.protect,
    authController.access,
    authController.restrictTo("user"),
    todoController.updateAnItem
  )
  .delete(
    authController.protect,
    authController.restrictTo("user"),
    todoController.deleteAnItem
  );

module.exports = router;
