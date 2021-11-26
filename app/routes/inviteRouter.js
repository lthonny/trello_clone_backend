const Router = require('express');
const inviteController = require('../controllers/inviteController');
const router = new Router();

router.post('/', inviteController.getBoard);
router.get('/create/:id', inviteController.createInvite);
// router.post('/key/:key', inviteController.invite);
router.post('/users/:id', inviteController.invitedUsers);
router.post('/owner', inviteController.owner);
router.post('/leave', inviteController.leaveBoard);
router.post('/remove', inviteController.removeInvited);

module.exports = router;
