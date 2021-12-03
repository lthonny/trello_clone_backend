const Router = require('express');
const authorize = require('../middlewares/authorize');
// const assignedUsers = require('../controllers/assignedController');
const router = new Router();

// router.post(`/:id`, authorize, assignedUsers.assignedUsers);
// router.post(`/create/:id`, authorize, assignedUsers.createAssignedUser);
// router.post(`/remove/:id`, authorize, assignedUsers.removeAssignedUser);

module.exports = router;
