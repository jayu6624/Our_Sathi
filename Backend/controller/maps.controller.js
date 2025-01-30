const mapservise = require("../servises/Maps.servise");
const { validationResult } = require("express-validator");

module.exports.getcoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;

  try {
    const coordinates = await mapservise.getAddressCorrdinates(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(404).json("coordinates not found ");
  }
};
