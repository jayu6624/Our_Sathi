const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controller/user.controller');
const authmiddleware = require('../middlerware/auth.middle');

// Register route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phonenumber').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits long')
], userController.registerUser);

// Login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser);

// Get profile route
router.get('/getprofile', authmiddleware.authUser, userController.getProfile);

// Logout route
router.get('/logout', authmiddleware.authUser, userController.logout);

module.exports = router;
