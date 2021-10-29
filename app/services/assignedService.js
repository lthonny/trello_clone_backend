const { user_tasks, User, Task } = require('../models/index');

class AssignedService {

  async fetch(taskId) {
    const usersTasks = await user_tasks.findAll({
      where: {
        task_id: taskId,
      },
    });

    const users = [];
    for (let i = 0; i < usersTasks.length; i++) {
      const user = await User.findOne({ where: { id: usersTasks[i].dataValues.user_id } });
      users.push({ id: user.id, name: user.name, assigned: usersTasks[i].dataValues.assigned });
    }

    return users;
  }

  async create(userId, taskId) {
    const userTasks = await user_tasks.findOne({
      where: {
        user_id: userId,
        task_id: taskId,
      },
    });

    if (userTasks) {
      return { error: 'error! data the user is already bound to this task' };
    }

    const modelUserTasks = await user_tasks.create({
      user_id: userId,
      task_id: taskId,
      assigned: true,
    });

    const user = await User.findOne({
      where: { id: userId },
    });

    const task = await Task.findOne({
      where: { id: taskId },
    });

    return {
      id: user.id,
      name: user.name,
      assigned: modelUserTasks.assigned,
    };
  }

  async update(userId, taskId, assigned) {
    const modelUserTasks = await user_tasks.update({ assigned: !assigned }, {
      where: {
        user_id: userId,
        task_id: taskId,
      },
    });

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  }

  // async remove(userId, taskId, assigned) {
  //
  //   const modelUserTasks = await user_tasks.findOne({
  //     user_id: userId,
  //     task_id: taskId,
  //     assigned: false
  //   });
  //
  //   console.log(modelUserTasks);
  //
  //   // return await user_tasks.update({where: {user_id: userId}});
  //   return {message: 'no assigned'}
  // }
}

module.exports = new AssignedService();
