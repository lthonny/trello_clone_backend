const Router = require('express');
const authorize = require('../middlewares/authorize');
const boardController = require('../contrellers/boardController');
const router = new Router();

router.get('/:id', authorize, boardController.board);
router.get('/getAllBoards/:id', authorize, boardController.boards);
router.get('/getAllTasks/:id', authorize, boardController.tasksBoard);
router.post('/create/:id', authorize, boardController.createBoard);
router.post('/update/:id', authorize, boardController.updateBoard);
router.delete('/delete/:id', authorize, boardController.deleteBoard);

module.exports = router;