const TransactionService = require('../services/transactionService');

class TransactionController {
  async transactions(req, res, next) {
    try {
      const transactions = await TransactionService.getTransaction(req.params.id);

      if(!transactions) {
        return res.sendStatus(204);
      }

      return res.status(200).json(transactions);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TransactionController();
