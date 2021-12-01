const { sequelize, User, Task } = require('../../models');

const getTransactionUserTask = async (user_id, task_id) => {
  const result = await sequelize.transaction(async (transaction) => {
    const user = await User.findOne({
      where: { id: user_id }, transaction
    });

    const task = await Task.findOne({
      where: { id: task_id }, transaction
    });

    return {
      id: task.id,
      name: user.name,
      nameTaskList: task.nameTaskList
    };
  });

  return result;
}

module.exports = getTransactionUserTask;