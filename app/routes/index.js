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

const authorize = require('../middlewares/authorize');

const userController = require('../contrellers/userController');
router.post('/api/signup', userController.signup);
router.post('/api/login', userController.login);
router.post('/api/logout', userController.logout);
router.get('/api/refresh', userController.refresh);
router.get('/api/isauth', userController.isauth);
router.get('/api/users', userController.users);

const boardController = require('../contrellers/boardController');
// router.get('/api/board/:id', authorize, boardController.board);
router.get('/api/boards/:id', authorize, boardController.boards);
router.delete('/api/board/:id', authorize, boardController.deleteBoard);
router.post('/api/board/create/:id', authorize, boardController.createBoard);
router.post('/api/board/update/:id', authorize, boardController.updateBoard);

const taskController = require('../contrellers/taskController');
// const userServices = require('../services/userServices');
// router.get('/api/task/:id', taskController.task);
router.get('/api/tasks/:id', authorize, taskController.tasks);
// router.delete('/api/task/:id', taskController.deleteTask);
router.post('/api/task/create/:id', taskController.createTask);
// router.post('/api/task/update/:id', taskController.updateTask);

module.exports = router;

