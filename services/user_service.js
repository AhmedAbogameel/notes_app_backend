const User = require('../models/user_model')

// @desc  Create user
// @route POST /api/v1/users
exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ "email": req.body.email });
        if (user) {
            throw new Error("Email exists!");
        }
        const document = await User.create(req.body);
        res.status(200).json(document);
    } catch (e) {
        console.log(e);
        res.status(400).json({ 'message': e.message })
    }
};

// @desc  Get user
// @route Get /api/v1/users/:id
exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await User.findById(id);
        if (!document) {
            throw new Error(`User ${id} does not exists`);
        }
        return res.status(200).json(document);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ 'message': e.message });
    }
};

// @desc  Delete user
// @route Delete /api/v1/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await User.findByIdAndDelete(id);

        if (!document) {
            throw new Error(`User ${id} does not exists`);
        }

        res.status(200).json(document);
    } catch (e) {
        res.status(400).json({ 'message': e.message })
    }
};

// @desc  Update user
// @route Patch /api/v1/users/:id
exports.updateUser = async (req, res) => {
    try {
        const document = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email
            },
            {
                new: true,
            }
        );
        if (!document) {
            throw new Error(`User ${id} does not exists`);
        }
        res.status(200).json(document);
    } catch (e) {
        res.status(400).json({ 'message': e.message })
    }
};