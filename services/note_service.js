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
        return res.status(400).json({ 'message': error.message });
    }
}

exports.getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ "message": `note with id : ${id} not found` });
        } else if (note.user_id !== user.id) {
            return res.status(401).json({ "message": "Unauthorized!" });
        }
        return res.json(note);
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
}

exports.getNotes = async (req, res) => {
    try {
        const { user } = req;
        const page = parseInt(req.query.page);
        const limit = 10;
        const skip = (page - 1) * limit;
        const total = await Note.countDocuments({ 'user_id': user.id });
        const notes = await Note.find({ 'user_id': user.id }).sort({ updatedAt: -1 }).skip(skip).limit(limit);
        return res.json({
            "total": Math.ceil(total / limit),
            "notes": notes
        });
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
}

exports.editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ 'message': `note ${id} not found` });
        } else if (note.user_id !== user.id) {
            return res.status(401).json({ 'message': "Unauthorized!" });
        }
        const { title, subtitle } = req.body;
        note.title = title;
        note.subtitle = subtitle;
        await note.save();
        return res.json(note);
    } catch (error) {
        return res.status(400).json({ 'message': error.message });
    }
}