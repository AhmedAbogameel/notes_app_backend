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

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ 'message': "Unauthorized!" });
        } 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ 'message': "Unauthorized!" });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({'message': "Invalid token, login again."});
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({'message': "Session expired"});
        }
        return res.status(400).json({ 'message': error.message });
    }
}