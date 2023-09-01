const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validator_middleware');

exports.addNoteValidator = [
    body("title").isLength({min: 4, max: 50}).withMessage("title must be between 4 and 50 characters."),
    body("subtitle").isLength({max: 500}).withMessage("subtitle must be under 500 characters."),
    validatorMiddleware,
]

exports.getNoteValidator = [
    check('id')
        .notEmpty().withMessage("note id required")
        .isMongoId().withMessage("Invalid id"),
    validatorMiddleware,
]