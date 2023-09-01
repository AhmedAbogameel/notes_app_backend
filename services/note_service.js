const Note = require('../models/note_model')

exports.addNote = async (req, res) => {
    try {
        const { user } = req;
        const { title, subtitle } = req.body;
        const note = await Note.create({
            "title": title,
            "subtitle": subtitle,
            "user_id": user.id
        });
        return res.json(note);
    } catch (error) {
        return res.status(400).json({'message': error.message});
    }
}

exports.getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({"message": `note with id : ${id} not found`});
        } else if (note.user_id !== user.id) {
            return res.status(401).json({"message": "Unauthorized!"});
        }
        return res.json(note);
    } catch (error) {
        return res.status(400).json({'message': error.message});
    }
}