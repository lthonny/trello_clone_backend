const Router = require('express');
const authorize = require('../middlewares/authorize');
const boardController = require('../controllers/boardController');
const router = new Router();

router.get('/', authorize, boardController.boards); // имя метода контр, должно содержать глагол
router.get('/tasks/:id', authorize, boardController.tasksBoard); // променять местами :id и tasks метод контроллера должен содержать глагол
router.post('/create', authorize, boardController.createBoard); // create не нужен в роуте
router.post('/update/:id', authorize, boardController.updateBoard); // променять местами :id и update использовать метод put
router.delete('/:id', authorize, boardController.deleteBoard);

module.exports = router;
