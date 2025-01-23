const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "Your first name must be at least 3 characters long"],
      maxLength: [30, "Your first name cannot exceed 30 characters"],
    },
    lastname: {
      type: String,
      minLength: [3, "Your last name must be at least 3 characters long"],
      maxLength: [30, "Your last name cannot exceed 30 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    index: true, // Added indexing
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Your password must be at least 6 characters long"],
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Your color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Your plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Your capacity must be at least 1"],
    },
    vehicletype: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
      default: 0, // Added default
    },
    lng: {
      type: Number,
      default: 0, // Corrected typo and added default
    },
  },
});

// Password hashing static method
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Password comparison method
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT generation method
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10000",
  });
  return token;
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
