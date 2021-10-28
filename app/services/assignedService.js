const { user_tasks, User } = require('../models/index');

class AssignedService {

  async fetch(taskId) {
    const usersTasks = await user_tasks.findAll({where: {
        task_id: taskId
      }});

    const users = [];
    for(let i = 0; i < usersTasks.length; i++) {
      const user = await User.findOne({where: {id: usersTasks[i].dataValues.user_id}});
      users.push({id: user.id, name: user.name, assigned: usersTasks[i].dataValues.assigned});
    }

    return users;
  }

  async add(userId, taskId) {
    console.log(userId, taskId);

    const user = await user_tasks.findOne({where: {
      user_id: userId,
      task_id: taskId
    }});

    if(user) {
      return 'error! data the user is already bound to this task';
    }

    const modelUserTasks = await user_tasks.create({
      user_id: userId,
      task_id: taskId,
      assigned: true
    });

    return modelUserTasks;
  }

  async remove(userId) {
    return await user_tasks.update({where: {user_id: userId}});
  }
}

module.exports = new AssignedService();
