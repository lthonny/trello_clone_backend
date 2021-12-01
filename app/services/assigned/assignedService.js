const { user_tasks, user_board, User, Task, sequelize } = require('../../models');
const { getTransactionUserTask } = require('../transactions/transaction');
const createActionHistory = require('../history/actionHistory');

class AssignedService {
  async fetch({ task_id, board_id }) {
    console.log('fetch');
    const result = await sequelize.transaction(async (transaction) => {
      const usersBoard = await user_board.findAll({ where: { board_id }, transaction });
      const usersTask = await user_tasks.findAll({ where: { task_id }, transaction });

      const owner = await user_board.findOne({
        where: { owner: true, board_id }, transaction,
      });

      const user = await User.findOne({ where: { id: owner.user_id } });

      return { usersBoard, usersTask, id: user.id, name: user.name };
    });

    const { usersBoard, usersTask, id, name } = result;

    // const dbUserTasks = await user_tasks.findAll({
    //   where: { user_id: id, task_id },
    //   // include: [{
    //   //   model: User
    //   // }]
    // })
    // console.log(dbUserTasks);

    let users_task = [];
    for (let i = 0; i < usersTask.length; i++) {
      const user = await User.findOne({
        where: { id: usersTask[i].dataValues.user_id },
      });
      users_task.push({
        id: user.id,
        name: user.name,
        task_id: usersTask[i].dataValues.task_id,
      });
    }

    let users_board = [];
    for (let i = 0; i < usersBoard.length; i++) {
      const user = await User.findOne({
        where: { id: usersBoard[i].dataValues.user_id },
      });
      users_board.push({ id: user.id, name: user.name });
    }

    return {
      allUsers: users_board,
      userAssigned: users_task,
      owner: { id, name },
    };
  }

  async create({ user_id, task_id, board_id }) {
    const result = await sequelize.transaction(async (transaction) => {
      const user = await User.findOne({
        where: { id: user_id }, transaction,
      });

      const exists = await user_tasks.findOne({
        where: { task_id, user_id }, transaction,
      });

      return { id: user.id, name: user.name, exists };
    });

    const { id, name, exists } = result;

    if (exists) {
      return { exist: 'user has already been added' };
    } else {
      const task = await Task.findOne({
        where: { id: task_id },
      });

      await user_tasks.create({ task_id, user_id, active: true, board_id });

      await createActionHistory(task_id, board_id, task.nameTaskList, name, 'assigned_users');

      return { id, name };
    }
  }

  async remove({ user_id, task_id, board_id }) {
    // const result = getTransactionUserTask(user_id, task_id);
    // const { id, name, nameTaskList } = result;
    // await createActionHistory(id, board_id, nameTaskList, name, 'no_assigned_users');

    const result = await sequelize.transaction(async (transaction) => {
      const user = await User.findOne({
        where: { id: user_id }, transaction,
      });

      const task = await Task.findOne({
        where: { id: task_id }, transaction,
      });

      await user_tasks.destroy({
        where: { task_id, user_id },
      });

      return { id: task.id, name: user.name, nameTaskList: task.nameTaskList };
    });

    const { id, name, nameTaskList } = result;

    await createActionHistory(id, board_id, nameTaskList, name, 'no_assigned_users');

    return null;
  }
}

module.exports = new AssignedService();
