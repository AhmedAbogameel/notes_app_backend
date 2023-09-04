const express = require('express');
const router = express.Router();

const { protect } = require('../services/authـservice');
const { addNote, getNote, getNotes, editNote, deleteNote } = require('../services/note_service');
const { addNoteValidator, getNoteValidator, getNotesValidator, editNoteValidator, deleteNoteValidator } = require('../utils/validators/note_validator');

router.post("/", protect, addNoteValidator, addNote);
router.get("/:id", protect, getNoteValidator, getNote);
router.get("/", protect, getNotesValidator, getNotes);
router.patch("/:id", protect, editNoteValidator, editNote);
router.delete("/:id", protect, deleteNoteValidator, deleteNote);

module.exports = router;