const { Transaction } = require('../models/index');

class TransactionService {
  async fetch(id, user_name, board_id) {
    const getTasks = await Transaction.findAll({ where: { task_id: id } });
    if (!getTasks) {
      return { error: 'this problem has no history' };
    }
    return getTasks;
  }
}

module.exports = new TransactionService();