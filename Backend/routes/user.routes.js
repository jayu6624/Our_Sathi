const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controller/user.controller');
const authmiddleware = require('../middlerware/auth.middle');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 charccter long'),
    body('password').isLength({min:6}).withMessage('password must be length of 6')
],userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be length of 6')
],userController.loginUser)

router.get('/getprofile',authmiddleware.authUser,userController.getProfile);

router.get('/logout',authmiddleware.authUser,userController.logout);

module.exports = router;
