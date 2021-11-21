const Router = require('express');
const authorize = require('../middlewares/authorize');
const transactionController = require('../contrellers/transactionController');
const router = new Router();

router.post(`/:id`, authorize, transactionController.getTransactions);

module.exports = router;