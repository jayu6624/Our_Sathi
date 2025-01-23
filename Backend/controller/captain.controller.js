const captainModel = require("../models/captain.model");
const captainservise = require("../servises/captain.servise");
const blacklistToken = require("../models/BlacklistToken.model");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if the email already exists in the database
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create the new captain
    const captain = await captainservise.creatcaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicletype: vehicle.vehicletype,
    });

    // Generate a token and send a response
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    console.error("Error in registerCaptain:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("req.body = ", req.body);

  const { email, password } = req.body;
  console.log("email = ", email);
  
  const captain = await captainModel.findOne({ email }).select("password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password " });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.getProfile = async (req, res, next) => {
  return res.status(200).json({ captain: req.captain });
};

module.exports.logout = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  console.log(token);

  const blacklisted = await blacklistToken.create({ token });
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successfully" });
};
