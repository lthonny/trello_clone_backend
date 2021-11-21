const Router = require('express');
const userController = require('../contrellers/userController');
const authorize = require('../middlewares/authorize');
const router = new Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);
router.get('/isauth', userController.isauth);
router.post('/logout', authorize, userController.logout);

module.exports = router;