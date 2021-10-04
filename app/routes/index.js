const express = require('express');
const router = express.Router();

const userController = require('../contrellers/userController');





router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.get('/isauth', userController.isauth);

module.exports = router;