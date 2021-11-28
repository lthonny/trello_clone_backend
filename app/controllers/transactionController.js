const TransactionService = require('../services/transactionService');

class TransactionController {
  async getTransactions(req, res, next) {
    try {
      const { board_id } = req.body;
      return res.status(200).json(await TransactionService.fetch(req.params.id, board_id));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TransactionController();
