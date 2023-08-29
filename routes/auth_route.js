const express = require('express');
const router = express.Router();

const {
    register,
    login,
} = require('../services/authـservice');

const {
    registerValidator,
    loginValidator
} = require('../utils/validators/auth_validator');

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

module.exports = router;