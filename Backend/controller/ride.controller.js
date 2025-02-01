const validationResult = require("express-validator");
const rideservice = require('../servises/ride.service');
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors });
  }

  const {userId,pickup,destination,vehicleType} = req.body;

  try {
    const ride = await rideservice.createRide()
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
};
