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
  .post('/api/logout', authorize, userController.logout)
  .get('/api/refresh', userController.refresh)
  .get('/api/isauth', userController.isauth);
// .get('/api/users', userController.users);

router
  .get('/api/board/:id', authorize, boardController.board)
  .get('/api/boards/:id', authorize, boardController.boards)
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
  .post('/api/invite/owner', InviteController.owner)
  .post('/api/leave/board/user', InviteController.leaveBoard)
  .post('/api/remove/invited/user', InviteController.removeInvited);


const AssignedUsers = require('../contrellers/assignedController');

router
  .post(`/api/assigned/users/:id`, authorize, AssignedUsers.assignedUsers)
  .post(`/api/assigned/user/create/:id`, authorize, AssignedUsers.createAssignedUser)
  .post(`/api/assigned/user/remove/:id`, authorize, AssignedUsers.removeAssignedUser);

const Transaction = require('../contrellers/transactionController');
const passport = require('passport');

router
  .post(`/api/task/transaction/:id`, authorize, Transaction.getTransactions);

// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     res.redirect(`${process.env.CLIENT_URL}/admin/boards/`);
//   } else {
//     next();
//   }
// };

// const googleController = require('../contrellers/googleController');
// const userService = require('../services/userServices');
// const tokenService = require('../services/tokenService');
//
// router
//   .get('/success/redirect', (req, res) => {
//     //   // req.login(user, function(err) {
//     //   //   if (err) { return next(err); }
//     console.log('req', req);
//     res.cookie('id', req.user.id, {
//       maxAge: 30 * 24 * 60 * 60 * 1000, secure: false
//     });
//     res.cookie('name', req.user.name, {
//       maxAge: 30 * 24 * 60 * 60 * 1000, secure: false
//     });
//
//     res.cookie('refreshToken', req.refreshToken, {
//       maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false
//     });
//
//     return res.redirect(`${process.env.CLIENT_URL}/admin/boards/`);
//   });
//
// router.get('/login/success', (req, res) => {
//   // if (req.user) {
//   //   res.status(200).json({
//   //     success: true,
//   //     message: 'successfull',
//   //     user: req.user,
//   //   });
//   // }
//   console.log('kk', req);
// })
//
//   .get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email'],
//   }))
//
// .get('/auth/google/callback', passport.authenticate('google', {
//         // seccessRedirect: '/login/success',
//         successRedirect: '/success/redirect',
//         failureRedirect: '/login/failed',
//       }), async (req, res) => {
//           // req.send('dsad');
//           // req.flash('id', req.user.id);
//               // console.log('Google user data');
//           //       req.logIn('ВАсилий', () => {
//           //         return res.json({ message: 'logged in with Google!' });
//           //       });
//           //     }
//           //   // };
//           //   )(req, res, next)
//           // )
//     // console.log(req.refreshToken);
//     console.log('refreshToken', req.refreshToken);
//         }
//     )
// // )

// .get('/logout', googleController.logoutUser)
// .get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// })

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

module.exports = router;

