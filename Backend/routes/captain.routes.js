const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const captainController = require("../controller/captain.controller");
const authmiddleware = require("../middlerware/auth.middle");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Your password must be at least 6 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Your first name must be at least 3 characters long"),
    body("fullname.lastname")
      .optional() // Last name is optional, validate only if provided
      .isLength({ min: 3 })
      .withMessage("Your last name must be at least 3 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Your vehicle color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Your vehicle plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Your vehicle capacity must be at least 1"),
    body("vehicle.vehicletype")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Please enter a valid vehicle type"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Your password must be at least 6 characters long"),
  ],
  captainController.loginCaptain
);

router.get("/getprofile", authmiddleware.authcaptains,captainController.getProfile);

router.get("/logout", authmiddleware.authcaptains,captainController.logout);

module.exports = router;
