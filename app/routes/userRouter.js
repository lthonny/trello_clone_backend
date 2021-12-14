const Router = require('express');
const userController = require('../controllers/userController');
const authorize = require('../middlewares/authorize');
const router = new Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/refresh', authorize, userController.refresh);
router.get('/isauth', authorize, userController.isauth);
router.post('/logout', userController.logout);

module.exports = router;
