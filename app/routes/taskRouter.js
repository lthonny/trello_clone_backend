const authorize = require('../middlewares/authorize');
const taskController = require('../controllers/taskController');
const Router = require("express");
const router = new Router();

router.post('/create', authorize, taskController.createTask); // убрать create из роута
router.post('/update/title', authorize, taskController.updateTitle); // :id/title метод PUT
router.post('/update/column', authorize, taskController.updateTask); // :id/column метод PUT
router.post(`/update/order`, authorize, taskController.updateOrder); // :id/order метод PUT
router.post(`/update/description`, authorize, taskController.updateDescription); // :id/description метод PUT
router.delete('/:id', authorize, taskController.deleteTask);
router.post(`/allDelete/:id`, authorize, taskController.removeTasks); // перенести в борд

module.exports = router;
