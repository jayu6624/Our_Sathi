const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes
router.post(
  "/register",
  [
    body("fullname").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("phonenumber").notEmpty().withMessage("Phone number is required"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  userController.loginUser
);

// Protected routes - require authentication
router.get("/getprofile", authMiddleware, userController.getProfile);
router.post("/logout", authMiddleware, userController.logout);

module.exports = router;
