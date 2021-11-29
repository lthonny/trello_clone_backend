const authorize = require('../middlewares/authorize');
const taskController = require('../controllers/taskController');
const Router = require("express");
const router = new Router();

router.post('/create', authorize, taskController.createTask);
router.post('/updateTitle', authorize, taskController.updateTitle);
router.post('/update', authorize, taskController.updateTask);
router.post(`/updateOrder`, authorize, taskController.updateOrder);
router.post(`/updateDescription`, authorize, taskController.updateDescription);
router.delete('/:id', authorize, taskController.deleteTask);
router.post(`/allDelete/:id`, authorize, taskController.removeTasks);

module.exports = router;
