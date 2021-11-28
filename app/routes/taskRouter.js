const authorize = require('../middlewares/authorize');
const taskController = require('../controllers/taskController');
const Router = require("express");
const router = new Router();

router.get('/:id', authorize, taskController.task);
router.post('/create/:id', authorize, taskController.createTask);
router.post('/updateTitle', authorize, taskController.updateTitle);
router.post('/update', authorize, taskController.updateTask);
router.post(`/updateOrder/:id`, authorize, taskController.updateOrder);
router.post(`/updateDescription`, authorize, taskController.updateDescription);
router.delete('/:id', authorize, taskController.deleteTask);
router.post(`/allDelete/:id`, authorize, taskController.removeTasks);

module.exports = router;
