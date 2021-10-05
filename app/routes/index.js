const express = require('express');
const router = express.Router();
// const passport = require('passport');
//
// const initializePassport = require('../services/passport-config');
// initializePassport(passport, email => {
//     passport,
//     email => users.find(user => user.email === email)
// });

// const passport = require('passport');
// const userServices = require('../services/userServices');

const userController = require('../contrellers/userController');
router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/isauth', userController.isauth);

const boardController = require('../contrellers/boardController');
router.get('/boards/:id', boardController.board);
router.get('/boards', boardController.boards);
router.post('/boards/create', boardController.createBoard);

const taskController = require('../contrellers/taskController');
const userServices = require('../services/userServices');
router.get('/task/:id', taskController.task);
router.get('/tasks', taskController.tasks);
router.post('/tasks/create', taskController.createTask);

module.exports = router;

