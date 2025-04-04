const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const ridecontroller = require("../controller/ride.controller");
const authmiddleware = require("../middlerware/auth.middle");

router.post(
  "/create",
  authmiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicle type"),

  ridecontroller.createRide
);

router.get(
  "/getfare",
  ridecontroller.getfare,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  authmiddleware.authUser
);

module.exports = router;
