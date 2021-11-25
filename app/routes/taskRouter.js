const Router = require('express');
const authorize = require('../middlewares/authorize');
const taskController = require('../controllers/taskController');
const router = new Router();

router.get('/:id', authorize, taskController.task);
router.get('/fetch/:id', authorize, taskController.tasks);
router.delete('/delete/:id', authorize, taskController.deleteTask);
router.post(`/allRemove/:id`, authorize, taskController.removeTasks);
router.post('/create/:id', authorize, taskController.createTask);
router.post('/updateTitle', authorize, taskController.titleUpdate);
router.post('/update', authorize, taskController.updateTask);
router.post(`/updateOrder/:id`, authorize, taskController.updateOrder);
router.post(`/updateDescription`, authorize, taskController.updateDescription);
router.get(`/archive/:id`, authorize, taskController.fetchArchive);
router.post(`/archive`, authorize, taskController.createArchive);

module.exports = router;