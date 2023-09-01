const Note = require('../models/note_model')

exports.addNote = async (req, res) => {
    try {
        const { user_id } = req;
        const { title, subtitle } = req.body;
        const note = await Note.create({
            "title": title,
            "subtitle": subtitle,
            "user_id": user_id
        });
        return res.json(note);
    } catch (error) {
        return res.status(400).json({'message': error.message});
    }
}