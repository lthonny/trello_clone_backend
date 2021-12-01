const { HistoryAction } = require('../../models');

const createActionHistory = async (task_id, board_id, column, name_user, action) => {
  const data = {
    task_id: Number(task_id),
    board_id: Number(board_id),
    column: String(column),
    name_user: String(name_user),
    transaction: String(action),
  };

  await HistoryAction.create({
      task_id: data.task_id,
      board_id: data.board_id,
      column: data.column,
      name_user: data.name_user,
      transaction: data.transaction,
    },
  );
};

module.exports = createActionHistory;
