const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "required!"],
        trim: true
    },
    email: {
        required: [true, "required!"],
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        required: [true, "required!"],
        minLength: [6, "Too short"],
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)
    next();
});

const user = mongoose.model('User', userSchema);

module.exports = user;