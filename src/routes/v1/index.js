const express = require('express');

const { InfoController } = require('../../controllers');
const { AuthMiddlewares } = require('../../middlewares');


const userRoutes = require('./user-routes');
const messageRoutes = require('./message-routes');
const conversationRoutes = require('./conversation-routes');

const router = express.Router();


router.use('/user', userRoutes);

router.use('/message', messageRoutes);

router.use('/conversation', conversationRoutes);

router.get('/info', InfoController.info);

module.exports = router;