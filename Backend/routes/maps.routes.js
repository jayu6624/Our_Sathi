const express = require("express");
const router = express.Router();
const authmiddleware = require("../middlerware/auth.middle");
const getcoordinates = require("../controller/maps.controller");
const { query } = require("express-validator");
const mapsService = require("../servises/Maps.servise.js");

router.get("/get-coordinates", async (req, res) => {
  try {
    const address = req.query.address;
    const coordinates = await mapsService.getAddressCorrdinates(address);
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
