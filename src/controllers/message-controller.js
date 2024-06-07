const { MessageService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function sendMessage(req, res) {
    try {
        const message = await MessageService.sendMessage({
            receiverId: req.params.id,
            message: req.body.message,
            senderId: req.user._id,
        });
        SuccessResponse.data = message;
        SuccessResponse.message = 'Successfully sent a message';
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getMessages(req, res) {
    try {
        const message = await MessageService.getMessages({
            receiverId: req.params.id,
            senderId: req.user._id,
        });
        SuccessResponse.data = message;
        SuccessResponse.message = 'Successfully got all messages';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    sendMessage,
    getMessages,
};
