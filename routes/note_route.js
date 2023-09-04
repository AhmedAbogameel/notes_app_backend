const express = require('express');
const router = express.Router();

const { protect } = require('../services/authـservice');
const { addNote, getNote, getNotes, editNote } = require('../services/note_service');
const { addNoteValidator, getNoteValidator, getNotesValidator, editNoteValidator } = require('../utils/validators/note_validator');

router.post("/", protect, addNoteValidator, addNote);
router.get("/:id", protect, getNoteValidator, getNote);
router.get("/", protect, getNotesValidator, getNotes);
router.patch("/:id", protect, editNoteValidator, editNote);

module.exports = router;