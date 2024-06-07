const express = require('express');
const { AuthMiddlewares } = require('../../middlewares');

const { MessageController } = require('../../controllers');

const router = express.Router();

router.post(
    '/send/:id',
    AuthMiddlewares.checkAuth,
    MessageController.sendMessage
);

router.get('/:id', AuthMiddlewares.checkAuth, MessageController.getMessages);

module.exports = router;
