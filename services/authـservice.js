const User = require('../models/user_model');
const jwt = require('jsonwebtoken');


let createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });


exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createToken({id: user.id});
        res.status(200).json({
            "token": token,
            "data": user,
        })
    } catch (error) {
        res.status(400).json({ 'message': error.message })
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const token = createToken({id: user.id});
        res.json({
            "token": token,
            "data": user
        });
    } catch (error) {
        res.status(400).json({ 'message': error });
    }
};