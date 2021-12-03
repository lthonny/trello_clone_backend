const authorize = require('../middlewares/authorize');
const taskController = require('../controllers/taskController');
const Router = require("express");
const router = new Router();

router.get('/:id/history', authorize, taskController.getHistory);
router.post('/', authorize, taskController.createTask);
router.put('/:id/title', authorize, taskController.updateTitle);
router.put('/:id/column', authorize, taskController.updateColumn);
router.put(`/:id/order`, authorize, taskController.updateOrder);
router.put(`/:id/description`, authorize, taskController.updateDescription);
router.delete('/:id', authorize, taskController.deleteTask);

router.get(`/:id/assigned`, authorize, taskController.assignedUsers);

// router.post(`/:id/`, authorize, taskController.createAssignedUser);
// router.post(`/:id/`, authorize, taskController.removeAssignedUser);

module.exports = router;
