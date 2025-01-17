const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistToken = require("../models/BlacklistToken.model");
const captainModel = require("../models/captain.model");


module.exports.authUser = async (req, res, next) => {
  console.log("Headers:", req.headers.authorization?.split(" ")[1]);

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlacklisted = await userModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json("unauthorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await blacklistToken.findById(decoded._id);
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports.authcaptains = async (req, res, next) => {
  

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);
  
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlacklisted = await blacklistToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json("unauthorized");
  }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await captainModel.findById(decoded._id);
      req.captain = captain;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };