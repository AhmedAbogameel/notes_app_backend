const { validationResult } = require('express-validator');

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ message: errors.array()[0].msg });
  }
  next();
};

module.exports = validatorMiddleware;