const express = require('express');
const router = express.Router();

const { protect } = require('../services/authـservice');
const { addNote } = require('../services/note_service');
const { addNoteValidator } = require('../utils/validators/note_validator');

router.post("/", protect, addNoteValidator, addNote);

module.exports = router;