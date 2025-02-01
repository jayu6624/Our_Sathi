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
    const { origin, destination } = req.query;
    console.log("rrrrr");

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
