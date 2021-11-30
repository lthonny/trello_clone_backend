const { HistoryAction } = require('../../models');

const createActionHistory = async (task_id, board_id, column, name_user, action) => {
  await HistoryAction.create({ task_id, column, name_user, board_id, transaction: action, });
};

module.exports = createActionHistory;
