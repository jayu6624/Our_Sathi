const { validationResult } = require("express-validator");
const rideservice = require("../servises/ride.service");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  if (!req.user || !req.user._id) {
    console.log("Error: User not found in request object", req.user);
    return res.status(401).json({ error: "Unauthorized: User not found" });
  }

  const { pickup, destination, vehicleType } = req.body;
  

  try {
    const ride = await rideservice.createRide({
      user: req.user._id,
      destination,
      pickup,
      vehicleType,
    });

    return res.status(201).json({ message: "Ride created successfully", ride });
  } catch (error) {
    console.error("Ride creation error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getfare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideservice.getfare(pickup, destination);
    return res.status(200).json({ fare });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

