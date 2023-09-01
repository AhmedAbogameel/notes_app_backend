const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "required!"],
    },
    subtitle: {
        type: String,
    },
    user_id: {
        type: String,
        required: [true, "required!"],
    }
}, { timestamps: true });

const note = mongoose.model("Note", noteSchema);

module.exports = note;