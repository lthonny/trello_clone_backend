const TransactionService = require('../services/history/actionHistoryService');

class HistoryController {
  async transactions(req, res) {
    try {
      const actionHistory = await TransactionService.getTransaction(req.params.id);
      return res.status(200).json(actionHistory);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new HistoryController();
