const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/exists/:email").get(authController.isExisting);
router.route("/signup").post(authController.signUp);
router.route("/confirmEmail").post(authController.confirmEmail);
router.route("/login").post(authController.login);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router
  .route("/updatePassword")
  .patch(authController.protect, authController.updatePassword);
router
  .route("/updateMe")
  .patch(authController.protect, userController.updateMe);
router
  .route("/deactivate")
  .delete(authController.protect, userController.deactivate);

router.route("/").get(authController.protect, userController.getAllUsers);

router.route("/:id").get(authController.protect, userController.getUser);

module.exports = router;
