const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
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
  .get('/api/isauth', userController.isauth);
// .get('/api/users', userController.users);

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
  .post(`/api/task/archive`, authorize, taskController.createArchive);


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
  .post(`/api/assigned/user/remove/:id`, authorize, AssignedUsers.removeAssignedUser);

const Transaction = require('../contrellers/transactionController');
const passport = require('passport');

router
  .post(`/api/task/transaction/:id`, authorize, Transaction.getTransactions);

const authCheck = (req, res, next) => {
  if(!req.user) {
    res.redirect(`${process.env.CLIENT_URL}/admin/boards/`);
  } else {
    next();
  }
}

const googleController = require('../contrellers/googleController');

router
  // .get('/api/auth/google/user', googleController.user)
  .get('/login/success', (req, res) => {
    //   // req.login(user, function(err) {
    //   //   if (err) { return next(err); }

    // console.log();

    // return res.redirect(`${process.env.CLIENT_URL}/admin/boards/`);
    //   // ${process.env.CLIENT_URL}/admin/boards/
    //   // });
    //   // /api/boards/:id'
    //   // console.log(`http://localhost:5000/api/boards/${req.user.id}`);
    //   // console.log(`${process.env.CLIENT_URL}/api/boards/${req.user.id}`);
  });

router.get('/login/success', (req, res) => {
  // if (req.user) {
  //   res.status(200).json({
  //     success: true,
  //     message: 'successfull',
  //     user: req.user,
  //   });
  // }
  console.log('kk', req);
})

  .get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }))


.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.CLIENT_URL}/admin/boards/1`);
  })

  // .get('/auth/google/callback', passport.authenticate('google', { seccessRedirect: '/login/success'
  //       //   successRedirect: `${process.env.CLIENT_URL}/admin/boards`,
  //       //   failureRedirect: '/login/failed',
  //       }), async (req, res) => {
  //           // req.send('dsad');
  //
  //               console.log('Google user data');
  //           //       req.logIn('ВАсилий', () => {
  //           //         return res.json({ message: 'logged in with Google!' });
  //           //       });
  //           //     }
  //           //   // };
  //           //   )(req, res, next)
  //           // )
  //         }
  //     )
  // // )
  .get('/logout', googleController.logoutUser)
  .get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

module.exports = router;

