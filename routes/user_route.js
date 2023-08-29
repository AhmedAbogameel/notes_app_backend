const express = require('express');
const router = express.Router();

const {
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = require('../services/user_service');

const {
    createUserValidator,
    updateUserValidator,
    getUserValidator,
    deleteUserValidator,
} = require('../utils/validators/user_validator');

router.post("/", createUserValidator, createUser);
router.get("/:id", getUserValidator, getUser);
router.patch('/:id', updateUserValidator, updateUser);
router.delete('/:id', deleteUserValidator, deleteUser);

module.exports = router;