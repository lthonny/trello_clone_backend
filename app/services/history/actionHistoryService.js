const { HistoryAction } = require('../../models');

class ActionHistoryService {
  async getTransaction(id) {
    const getTasks = await HistoryAction.findAll({ where: { task_id: id } });

    if (!getTasks) {
      return null;
    }

    return getTasks;
  }
}

module.exports = new ActionHistoryService();
