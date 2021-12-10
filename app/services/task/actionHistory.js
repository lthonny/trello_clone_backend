const { HistoryAction, User } = require('../../models');

const createActionHistory = async (
  task_id,
  board_id,
  column,
  user_id,
  action,
) => {
  const data = {
    task_id: Number(task_id),
    board_id: Number(board_id),
    column: String(column),
    transaction: String(action),
  };

  const user = await User.findOne({ where: { id: user_id } });

  await HistoryAction.create({
    task_id: data.task_id,
    board_id: data.board_id,
    column: data.column,
    name_user: user.dataValues.name,
    transaction: data.transaction,
  });
};

module.exports = createActionHistory;
