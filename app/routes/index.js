const express = require('express');
const router = express.Router();

const authorize = require('../middlewares/authorize');
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

router
  .post('/api/signup', userController.signup)
  .post('/api/login', userController.login)
  .post('/api/logout', userController.logout)
  .get('/api/refresh', userController.refresh)
  .get('/api/isauth', userController.isauth)
  .get('/api/users', userController.users);


const boardController = require('../contrellers/boardController');

router
  .get('/api/board/:id', authorize, boardController.board)
  .get('/api/boards/:id', authorize, boardController.boards)
  .delete('/api/board/:id', authorize, boardController.deleteBoard)
  .post('/api/board/create/:id', authorize, boardController.createBoard);


router.post('/api/board/update/:id', authorize, boardController.updateBoard);


const taskController = require('../contrellers/taskController');

router
  // .get('/api/task/:id', authorize, taskController.task)
  // .get('/api/tasks/:id', authorize, taskController.tasks)
  .delete('/api/task/:id', authorize, taskController.deleteTask)
  .post('/api/task/create/:id', authorize, taskController.createTask)
  .post('/api/task/update', authorize, taskController.updateTask)
  .post(`/api/tasks/updateOrder/:id`, authorize, taskController.updateOrder)
  .post(`/api/task/updateDescription`, authorize, taskController.updateDescription)
  .get(`/api/tasks/archive/:id`, authorize, taskController.fetchArchive)
  .post(`/api/task/archive`, authorize, taskController.createArchive)


module.exports = router;

