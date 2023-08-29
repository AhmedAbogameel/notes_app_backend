const { check, body } = require('express-validator');
const User = require('../../models/user_model');
const validatorMiddleware = require('../../middlewares/validator_middleware')

exports.createUserValidator = [
    body('name')
        .notEmpty().withMessage('Name required!')
        .isLength({ min: 2 }).withMessage('Name too short!'),

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

    validatorMiddleware,
];

exports.updateUserValidator = [
    check('id')
        .isMongoId().withMessage('Invalid User id format'),

    body('name')
        .notEmpty().withMessage('Name required!')
        .isLength({ min: 2 }).withMessage('Name too short!'),

    body('email')
        .optional()
        .isEmail().withMessage("Invalid email!")
        .custom((val) =>
            User.findOne({ 'email': val }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('Email exists!'));
                }
            })
        ),

    validatorMiddleware,
];

exports.deleteUserValidator = [
    check('id')
        .isMongoId().withMessage('Invalid User id format'),

    validatorMiddleware,
];

exports.getUserValidator = [
    check('id')
        .isMongoId().withMessage('Invalid User id format'),

    validatorMiddleware,
];