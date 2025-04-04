const mapservise = require("../servises/Maps.servise");
const { validationResult } = require("express-validator");

module.exports.getcoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;

  try {
    const coordinates = await mapservise.getAddressCoordinates(address);

    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(404).json("coordinates not found ");
  }
};

module.exports.getdistancetime = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  try {
    console.log("rrrrr");
    const { origin, destination } = req.query;

    const distancetime = await mapservise.getDistTime(origin, destination);

    return res.status(200).json(distancetime);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getsuggestion = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { input } = req.query;

  const suggestions = await mapservise.getAutocompletesuggestion(input);

  return res.status(200).json(suggestions);
};

// Add new controller method for reverse geocoding
module.exports.reverseGeocode = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { lat, lng } = req.query;
  console.log("lat = ", lat);
  console.log("lng = ", lng);
  

  try {
    const address = await mapservise.reverseGeocode(lat, lng);
    return res.status(200).json(address);
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return res
      .status(500)
      .json({ message: "Failed to get address from coordinates" });
  }
};
