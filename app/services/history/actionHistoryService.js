const { HistoryAction } = require('../../models');

class ActionHistoryService {
  async getTransaction(task_id) {
    const getTasks = await HistoryAction.findAll({ where: { task_id } });

    if (!getTasks) {
      return [];
    }

    return getTasks;
  }
}

module.exports = new ActionHistoryService();
