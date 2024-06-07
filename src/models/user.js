const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ServerConfig } = require('../config');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female'],
        },
        profilePicture: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this;
    const encryptedPassword = await bcrypt.hash(
        user.password,
        ServerConfig.SALT_ROUNDS
    );
    user.password = encryptedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
