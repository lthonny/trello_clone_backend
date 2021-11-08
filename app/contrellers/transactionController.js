const TransactionService = require('../services/transactionService');

class TransactionController {
  async getTransactions(req, res, next) {
    try {
      const {board_id} = req.body;
      const transaction = await TransactionService.fetch(req.params.id, board_id);
      return res.json(transaction);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TransactionController();