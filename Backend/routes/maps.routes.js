const express = require("express");
const router = express.Router();
const authmiddleware = require("../middlerware/auth.middle");
const mapcontrollers = require("../controller/maps.controller");
const { query } = require("express-validator");
const mapsService = require("../servises/Maps.servise.js");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authmiddleware.authUser,
  mapcontrollers.getcoordinates
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authmiddleware.authUser,
  mapcontrollers.getdistancetime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authmiddleware.authUser,
  mapcontrollers.getsuggestion
);

module.exports = router;
