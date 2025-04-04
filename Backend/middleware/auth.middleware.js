const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistToken = require("../models/BlacklistToken.model");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          message:
            "No token provided or invalid format. Please provide a Bearer token.",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklistToken.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ message: "Token has been invalidated. Please login again." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = authMiddleware;
