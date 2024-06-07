const express = require('express');
const { AuthMiddlewares } = require('../../middlewares');
const { UserController } = require('../../controllers');

const router = express.Router();

router.post(
    '/signup',
    AuthMiddlewares.validateAuthRequest,
    UserController.createUser
);

router.post(
    '/signin',
    AuthMiddlewares.validateAuthRequest,
    UserController.signin
);

router.post('/logout', UserController.logout);

router.get('/', AuthMiddlewares.checkAuth, UserController.getUsersForSidebar);

module.exports = router;
