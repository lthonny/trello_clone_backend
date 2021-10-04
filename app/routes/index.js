const express = require('express');
const router = express.Router();

const userController = require('../contrellers/userController');
router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.get('/isauth', userController.isauth);

const boardController = require('../contrellers/boardController');
router.get('/boards', boardController.boards);
router.post('/boards/create', boardController.board);

module.exports = router;
