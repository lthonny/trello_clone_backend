const { user_tasks, user_board, User, Task } = require('../../models');
const createActionHistory = require('../history/actionHistory');

class AssignedService {
  async fetch({ task_id, board_id }) {
    const usersBoard = await user_board.findAll({ where: { board_id } });
    const usersTask = await user_tasks.findAll({ where: { task_id } });

    const owner = await user_board.findOne({
      where: { owner: true, board_id },
    });

    const user = await User.findOne({ where: { id: owner.user_id } });

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
      owner: { id: user.id, name: user.name },
    };
  }

  async create({ user_id, task_id, board_id }) {
    const user = await User.findOne({
      where: { id: user_id },
    });

    const exists = await user_tasks.findOne({
      where: { task_id, user_id },
    });

    if (exists) {
      return { exist: 'user has already been added' };
    } else {
      const task = await Task.findOne({
        where: { id: task_id },
      });

      await user_tasks.create({ task_id, user_id, active: true, board_id });

      await createActionHistory(Number(task_id), Number(board_id), String(task.nameTaskList), String(user.name), String('assigned_users'));

      return { id: user.id, name: user.name };
    }
  }

  async remove({ user_id, task_id, board_id }) {
    const user = await User.findOne({
      where: { id: user_id },
    });

    const task = await Task.findOne({
      where: { id: task_id },
    });

    await createActionHistory(Number(task.id), Number(board_id), String(task.nameTaskList), String(user.name), String('no_assigned_users'));

    return await user_tasks.destroy({
      where: { task_id, user_id },
    });
  }
}

module.exports = new AssignedService();
