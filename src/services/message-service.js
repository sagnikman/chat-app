const { MessageRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const messageRepository = new MessageRepository();

async function sendMessage(data) {
    try {
        const message = await messageRepository.sendMessage(data);
        return message;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot send message', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getMessages(data) {
    try {
        const message = await messageRepository.getMessages(data);
        return message;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot get all messages', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    sendMessage,
    getMessages,
}