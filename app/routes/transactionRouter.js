const Router = require('express');
const authorize = require('../middlewares/authorize');
const transactionController = require('../controllers/transactionController');
const router = new Router();

router.get(`/:id`, authorize, transactionController.transactions);

module.exports = router;
