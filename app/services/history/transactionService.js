const { Transaction } = require('../../models');

class TransactionService {
  async getTransaction(id) {
    const getTasks = await Transaction.findAll({ where: { task_id: id } });

    if (!getTasks) {
      return null;
    }

    return getTasks;
  }
}

module.exports = new TransactionService();
