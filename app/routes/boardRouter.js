const Router = require('express');
const authorize = require('../middlewares/authorize');
const boardController = require('../controllers/boardController');
const router = new Router();

router.get('/boards/:id', authorize, boardController.boards);
router.get('/tasks/:id', authorize, boardController.tasksBoard);
router.post('/create/:id', authorize, boardController.createBoard);
router.post('/update/:id', authorize, boardController.updateBoard);
router.delete('/:id', authorize, boardController.deleteBoard);

module.exports = router;
