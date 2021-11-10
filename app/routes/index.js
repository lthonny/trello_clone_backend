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
const GoogleController = require('../contrellers/googleController');
const boardController = require('../contrellers/boardController');
const taskController = require('../contrellers/taskController');

router
  .post('/api/signup', userController.signup)
  .post('/api/login', userController.login)
  .post('/api/logout', userController.logout)
  .get('/api/refresh', userController.refresh)
  .get('/api/isauth', userController.isauth)
  .get('/api/users', userController.users);

router
  .post('/api/singUpGoogle', GoogleController.singUp);
//   .post('/api/singIn', GoogleController.singIn);

router
  .get('/api/board/:id', authorize, boardController.board)
  .get('/api/boards/:id', boardController.boards)
  .get('/api/tasks/board/:id', authorize, boardController.tasksBoard)
  .post('/api/board/create/:id', authorize, boardController.createBoard)
  .post('/api/board/update/:id', authorize, boardController.updateBoard)
  .delete('/api/board/:id', authorize, boardController.deleteBoard);


router
  .get('/api/task/:id', authorize, taskController.task)
  .get('/api/tasks/:id', authorize, taskController.tasks)
  .delete('/api/task/:id', authorize, taskController.deleteTask)
  .post(`/api/tasks/board/:id`, authorize, taskController.removeTasks)
  .post('/api/task/create/:id', authorize, taskController.createTask)
    .post('/api/task/updateTitle', authorize, taskController.titleUpdate)
  .post('/api/task/update', authorize, taskController.updateTask)
  .post(`/api/tasks/updateOrder/:id`, authorize, taskController.updateOrder)
  .post(`/api/task/updateDescription`, authorize, taskController.updateDescription)
  .get(`/api/tasks/archive/:id`, authorize, taskController.fetchArchive)
  .post(`/api/task/archive`, authorize, taskController.createArchive)


const InviteController = require('../contrellers/inviteController');

router
    .get('/api/board/invite/:id', InviteController.createInvite)
    .post('/api/board/key/:key', InviteController.invite)
    .post('/api/invite', InviteController.getBoard)
    .post('/api/invited/users/:id', InviteController.invitedUsers)
    .post('/api/invite/owner', InviteController.owner);

const AssignedUsers = require('../contrellers/assignedController');

router
  .post(`/api/assigned/users/:id`, authorize, AssignedUsers.assignedUsers)
  .post(`/api/assigned/user/create/:id`, authorize, AssignedUsers.createAssignedUser)
  .post(`/api/assigned/user/remove/:id`, authorize, AssignedUsers.removeAssignedUser)

const Transaction = require('../contrellers/transactionController');

router
  .post(`/api/task/transaction/:id`, authorize, Transaction.getTransactions);

module.exports = router;

