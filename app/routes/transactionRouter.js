const Router = require('express');
const authorize = require('../middlewares/authorize');
const transactionController = require('../controllers/transactionController');
const router = new Router();

router.post(`/:id`, authorize, transactionController.getTransactions);

module.exports = router;