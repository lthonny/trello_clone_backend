const Router = require('express');
const authorize = require('../middlewares/authorize');
const inviteController = require('../controllers/inviteController');
const router = new Router();

router.post('/', authorize, inviteController.getBoard);
router.post('/create', authorize, inviteController.invite);
router.get('/users/:id', authorize, inviteController.invitedUsers);
router.get('/owner/:id', authorize, inviteController.owner);
router.delete('/leave/:id', authorize, inviteController.leaveBoard);
router.post('/delete/:id', authorize, inviteController.removeInvited);

module.exports = router;
