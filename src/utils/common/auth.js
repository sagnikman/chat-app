const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../../config')

function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        throw error;
    }
}

function createTokenAndSetCookie(input, res){
    try {
        const token = jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRY});
        res.cookie("jwt", token,{
            maxAge: 10 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development'
        })
        return token;
    } catch (error) {
        throw error;
    }
}

function verifyToken(token) {
    try {
        const verify = jwt.verify(token, ServerConfig.JWT_SECRET);
        return verify;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    checkPassword,
    createTokenAndSetCookie,
    verifyToken
}