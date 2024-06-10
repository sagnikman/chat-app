const { UserService } = require('../services');
const { Auth } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createUser(req, res) {
    try {
        const user = await UserService.createUser({
            fullName: req.body.fullName,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            profilePicture: req.body.profilePicture,
        });
        SuccessResponse.data = user;
        SuccessResponse.message = 'Successfully created an user';
        Auth.createTokenAndSetCookie(
            { id: user.id, username: user.username },
            res
        );
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function signin(req, res) {
    try {
        const user = await UserService.signin(
            {
                username: req.body.username,
                password: req.body.password,
            },
            res
        );
        SuccessResponse.data = user;
        SuccessResponse.message = 'Successfully signed in';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function logout(req, res) {
    try {
        const user = await UserService.logout(
            {
                username: req.body.username,
            },
            res
        );
        SuccessResponse.data = user;
        SuccessResponse.message = 'Successfully logged out';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getUsersForSidebar(req, res) {
    try {
        const users = await UserService.getUsersForSidebar({
            loggedInUserId: req.user._id,
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully got all users',
            data: users,
            error: {},
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong while getting all users',
            data: {},
            error: error,
        });
    }
}

module.exports = {
    createUser,
    signin,
    logout,
    getUsersForSidebar,
};
