const Router = require('express');
const authorize = require('../middlewares/authorize');
const boardController = require('../controllers/boardController');
const router = new Router();

router.get('/', authorize, boardController.boards);
router.get('/tasks/:id', authorize, boardController.tasks);
router.post('/create', authorize, boardController.board);
router.post('/update/:id', authorize, boardController.board);
router.delete('/:id', authorize, boardController.board);

module.exports = router;
