const userModel = require("../models/user.model");
const userServise = require("../servises/user.servises");
const { validationResult } = require("express-validator");
const blacklistToken = require('../models/BlacklistToken.model')



module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  
  const { fullname, email, password } = req.body;

 
  
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userServise.cerateUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();

  res.status(201).json({token,user});
};
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({email}).select('+password');  
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password " });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = user.generateAuthToken();
  console.log(token);
  
  res.cookie('token', token);
  res.status(200).json({ token,user});
}

module.exports.getProfile = async (req, res, next) => {
  return res.status(200).json(req.user);
}

module.exports.logout = async(req,res,next)=>{
   res.clearCookie('token');

   const token = req.cookies.token || req.headers.authorization.split(' ')[1];

   await blacklistToken.create({token});

   res.status(200).json({message:'logout successfully'})

}