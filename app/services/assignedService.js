const { user_tasks, user_board, User, Transaction, Task } = require('../models/index');

class AssignedService {
  async fetch({ data }) {
    const {taskId, boardId} = data;
    const usersBoard = await user_board.findAll({
      where: { board_id: boardId },
    });
    const usersTask = await user_tasks.findAll({
      where: { task_id: taskId },
    });

    const owner = await user_board.findOne({ where: { owner: true, board_id: boardId } });
    const user = await User.findOne({ where: { id: owner.user_id } });

    let users_task = [];
    for (let i = 0; i < usersTask.length; i++) {
      const user = await User.findOne({ where: { id: usersTask[i].dataValues.user_id } });
      users_task.push({ id: user.id, name: user.name, task_id: usersTask[i].dataValues.task_id });
    }

    let users_board = [];
    for (let i = 0; i < usersBoard.length; i++) {
      const user = await User.findOne({ where: { id: usersBoard[i].dataValues.user_id } });
      users_board.push({ id: user.id, name: user.name });
    }

    return {
      allUsers: users_board,
      userAssigned: users_task,
      owner: { id: user.id, name: user.name },
    };
  }

  async create({ userId, taskId, boardId }) {
    const user = await User.findOne({
      where: { id: userId },
    });

    const exists = await user_tasks.findOne({
      where: {
        task_id: taskId,
        user_id: user.id
      },
    });

    if (exists) {
      return { exist: 'user has already been added' };
    } else {
      const task = await Task.findOne({
        where: { id: taskId },
      });

      await user_tasks.create({
        task_id: taskId,
        user_id: userId,
        active: true,
        board_id: boardId
      });

      await Transaction.create({
        task_id: taskId,
        column: task.nameTaskList,
        name_user: user.name,
        board_id: boardId,
        transaction: 'assigned_users',
      });

      return { id: user.id, name: user.name };
    }
  }

  async remove({ userId, taskId, boardId }) {
    const user = await User.findOne({
      where: { id: userId },
    });

    const task = await Task.findOne({
      where: { id: taskId },
    });

    await Transaction.destroy({
      where: {
        task_id: taskId,
        column: task.nameTaskList,
        name_user: user.name,
        board_id: boardId,
        transaction: 'no_assigned_users',
      },
    });

    await user_tasks.destroy({
      where: {
        task_id: taskId,
        user_id: userId,
      },
    });
    return { message: 'no assigned' };
  }
}

module.exports = new AssignedService();
