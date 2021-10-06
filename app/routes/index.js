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
router.get('/board/:id', boardController.board);
router.get('/boards', boardController.boards);
router.delete('/board/:id', boardController.deleteBoard);
router.post('/board/create', boardController.createBoard);
router.post('/board/update/:id', boardController.updateBoard);

const taskController = require('../contrellers/taskController');
const userServices = require('../services/userServices');
router.get('/task/:id', taskController.task);
router.get('/tasks', taskController.tasks);
router.delete('/task/:id', taskController.deleteTask);
router.post('/task/create', taskController.createTask);
router.post('/task/update/:id', taskController.updateTask);

module.exports = router;

