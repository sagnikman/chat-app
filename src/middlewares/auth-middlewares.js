const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { UserService } = require('../services');
const { User } = require('../models');

function validateAuthRequest(req, res, next) {
    if(!req.body.username) {
        ErrorResponse.message = 'Something went wrong while signup of new user';
        ErrorResponse.error = new AppError(['username not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.password) {
        ErrorResponse.message = 'Something went wrong while signup of new user';
        ErrorResponse.error = new AppError(['password not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(req.body.password !== req.body.confirmPassword) {
        ErrorResponse.message = 'Something went wrong while signup of new user';
        ErrorResponse.error = new AppError(['password and confirmPassword do not match in the incoming request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            throw new AppError('Unauthorized: No token present', StatusCodes.UNAUTHORIZED);
        }
        const userId = await UserService.isAuthenticated(token);

        const userData = await User.findById(userId).select('-password');

        req.user = userData;    

        next();
            
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while authenticating user';
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}


module.exports = {
    validateAuthRequest,
    checkAuth
}