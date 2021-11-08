const { user_tasks, user_board, User, Task, Board } = require('../models/index');

class AssignedService {

  async fetch(taskId, userId, boardId) {
    const usersBoard = await user_board.findAll({where: {board_id: boardId}});

    let users = [];
    for (let i = 0; i < usersBoard.length; i++) {
      const user = await User.findOne({ where: { id: usersBoard[i].dataValues.user_id } });
      users.push({ id: user.id, name: user.name });
    }

    return { users };
  }

  async create(userId, taskId) {
    const userTask = await user_tasks.create({ task_id: taskId, user_id: userId });
    const user = await User.findOne({where: {id: userId}});
    return {id: user.id, name: user.name};
  }

  async update(userId, taskId) {
    await user_tasks.destroy({ where: { task_id: taskId, user_id: userId } });
    return 'ok';
  }

  async remove(userId, taskId, assigned) {

    const modelUserTasks = await user_tasks.findOne({
      user_id: userId,
      task_id: taskId,
      assigned: assigned,
    });

    console.log(modelUserTasks);

    // return await user_tasks.update({where: {user_id: userId}});
    return { message: 'no assigned' };
  }
}

module.exports = new AssignedService();
