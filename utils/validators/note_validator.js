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
        .isMongoId().withMessage("invalid id"),
    validatorMiddleware,
]

exports.getNotesValidator = [
    check('page')
        .notEmpty().withMessage("query param page is required")
        .isInt().withMessage("query param page must be int")
        .custom(v => v > 0).withMessage("query param page must be above 0"),
    validatorMiddleware,
]

exports.editNoteValidator = [
    check("id").notEmpty().withMessage("note id required").isMongoId().withMessage("invalid id"),
    body("title").isLength({min: 4, max: 50}).withMessage("title must be between 4 and 50 characters."),  
    body("subtitle").isLength({max: 500}).withMessage("subtitle must be under 500 characters."),
    validatorMiddleware,
]

exports.deleteNoteValidator = [
    check("id").notEmpty().withMessage("note id required").isMongoId().withMessage("invalid id"),
    validatorMiddleware,
]