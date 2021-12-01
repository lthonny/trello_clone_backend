const authorize = require('../middlewares/authorize');
const taskController = require('../controllers/taskController');
const Router = require("express");
const router = new Router();

router.post('/create', authorize, taskController.createTask);
router.post('/update/title', authorize, taskController.updateTitle);
router.post('/update/column', authorize, taskController.updateTask);
router.post(`/update/order`, authorize, taskController.updateOrder);
router.post(`/update/description`, authorize, taskController.updateDescription);
router.delete('/:id', authorize, taskController.deleteTask);
router.post(`/allDelete/:id`, authorize, taskController.removeTasks);

module.exports = router;
