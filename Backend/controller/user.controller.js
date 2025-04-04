const userModel = require("../models/user.model");
const userServise = require("../servises/user.servises");
const { validationResult } = require("express-validator");
const blacklistToken = require("../models/BlacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // Validate request payload
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, phonenumber } = req.body;
    if (!/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({
        message:
          "Invalid phone number format. Please provide a 10-digit number.",
      });
    }
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please try logging in.",
      });
    }

    // Hash password and create the new user
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userServise.cerateUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      phonenumber,
      password: hashedPassword,
    });

    console.log(user);

    // Generate token and send response
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password " });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = user.generateAuthToken();
  console.log(token);

  res.cookie("token", token);
  res.status(200).json({ token, user });
};

module.exports.getProfile = async (req, res, next) => {
  try {
    // User is already attached to req by the auth middleware
    const user = req.user;

    // Return user data without sensitive information
    return res.status(200).json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phonenumber: user.phonenumber,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.logout = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blacklistToken.create({ token });

  res.status(200).json({ message: "logout successfully" });
};
