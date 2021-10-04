const express = require('express');
const router = express.Router();
// const passport = require('passport');
//
// const initializePassport = require('../services/passport-config');
// initializePassport(passport, email => {
//     passport,
//     email => users.find(user => user.email === email)
// });

const userController = require('../contrellers/userController');
router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.get('/isauth', userController.isauth);

const boardController = require('../contrellers/boardController');
const passport = require('passport');
const userServices = require('../services/userServices');
router.get('/boards', boardController.boards);
router.post('/boards/create', boardController.board);

module.exports = router;

