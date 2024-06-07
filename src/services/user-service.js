const { UserRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Auth } = require('../utils/common');

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        if(data.gender === 'male') {
            data.profilePicture = `https://avatar.iran.liara.run/public/boy?username=${data.username}`;
        }
        else if(data.gender === 'female') {
            data.profilePicture = `https://avatar.iran.liara.run/public/girl?username=${data.username}`;
        }
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        throw new AppError('Cannot create a new user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data, res) {
    try {
        const user = await userRepository.getUserByUsername(data.username);
        if(!user) {
            throw new AppError('No user found for the given username', StatusCodes.NOT_FOUND);
        }
        console.log(data.password, user.password);
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        if(!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createTokenAndSetCookie({id: user.id, username: user.username}, res);
        return jwt;
    } catch (error) {
        throw error;
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if(!user) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function logout(data, res) {
    try {
        res.cookie('jwt', '', {
            maxAge: 0
        });
        return data.username;
    } catch (error) {
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createUser,
    signin,
    isAuthenticated,
    logout
}