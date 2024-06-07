const express = require('express');

const { ConversationController } = require('../../controllers');

const router = express.Router();

router.post('/send/:id', (req, res) => res.send('send/:id conversation test'));

module.exports = router;