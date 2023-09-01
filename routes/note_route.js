const express = require('express');
const router = express.Router();

const { protect } = require('../services/authـservice');
const { addNote, getNote } = require('../services/note_service');
const { addNoteValidator, getNoteValidator } = require('../utils/validators/note_validator');

router.post("/", protect, addNoteValidator, addNote);
router.get("/:id", protect, getNoteValidator, getNote);

module.exports = router;