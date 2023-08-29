const { check, body } = require('express-validator');
const User = require('../../models/user_model');
const validatorMiddleware = require('../../middlewares/validator_middleware')
const bcrypt = require('bcryptjs');

exports.registerValidator = [
    body('email')
        .notEmpty().withMessage("Email required!")
        .isEmail().withMessage("Invalid email!")
        .custom((val) =>
            User.findOne({ 'email': val }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('Email exists!'));
                }
            })
        ),

    body('password')
        .notEmpty().withMessage("Password required")
        .isLength({ min: 6 }).withMessage("Password "),

    body('name')
        .notEmpty().withMessage('Name required!')
        .isLength({ min: 2 }).withMessage('Name too short!'),

    validatorMiddleware,
];


exports.loginValidator = [
    body('password')
        .notEmpty().withMessage("Password required!")
        .isLength({min: 6}).withMessage("Password length at least 6 character"),

    body('email')
        .notEmpty().withMessage("Email required!")
        .isEmail().withMessage("Invalid email!")
        .custom((val, { req })  => 
            User.findOne({'email': val}).then((user) => {
                if (!user) {
                    return Promise.reject(new Error("Email does not exists!"));
                } 
                return bcrypt.compare(req.body.password, user.password).then((isPasswordCorrect) => {
                  if (!isPasswordCorrect) {
                    return Promise.reject(new Error("Email and password did not match"));
                  }  
                })
            })
        ),

    validatorMiddleware,
];