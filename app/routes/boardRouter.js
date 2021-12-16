const Router = require('express');
const authorize = require('../middlewares/authorize');
const boardController = require('../controllers/boardController');
const router = new Router();

router.get('/', authorize, boardController.getBoards);
router.post('/', authorize, boardController.createBoard);
router.get('/:id/invite/key', authorize, boardController.getInviteLink);  ///post!!!
router.get('/:id/invite/key/:key', authorize, boardController.getInviteBoard);
router.delete('/:id/invite/leave', authorize, boardController.leaveBoard);
router.get('/:id/tasks', authorize, boardController.getBoardTasks);
router.put('/:id', authorize, boardController.updateBoard);
router.delete('/:id', authorize, boardController.deleteBoard);
router.delete('/:id/column/:type', authorize, boardController.deleteTasksColumn);
router.delete('/:id/access/:user', authorize, boardController.deleteUserAccess);
router.get('/:id/archives', authorize, boardController.getArchives);
router.post(
  '/:id/archive/task/:task_id',
  authorize,
  boardController.createArchive,
);

module.exports = router;
