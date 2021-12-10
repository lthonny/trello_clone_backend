const { sequelize, Task, User, user_board, HistoryAction, user_tasks } = require('../../models');
const createActionHistory = require('./actionHistory');

class TaskService {
  testId = 999;

  async create(user_id, data) {
    const { title, description, nameTaskList, board_id, order } = data;

    const result = await sequelize.transaction(async (transaction) => {
      const task = await Task.create({
        title,
        description,
        nameTaskList,
        board_id,
        order,
        archive: false,
      }, transaction);

      return { task };
    });

    const { task } = await result;

    if(user_id !== this.testId) {
      await createActionHistory(task.id, board_id, nameTaskList, user_id, 'creation');
    }

    return task;
  }

  async updateTitle(task_id, title) {
    const result = await sequelize.transaction(async (transaction) => {
      await Task.update({ title }, { where: { id: task_id }, transaction });
      const task = await Task.findOne({ where: { id: task_id }, transaction });

      return task;
    });

    return result;
  }

  async updateDescription(user_id, task_id, description) {

    const result = await sequelize.transaction(async (transaction) => {
      await Task.update({ description }, { where: { id: task_id }, transaction });
      const task = await Task.findOne({ where: { id: task_id }, transaction });
      return { task };
    });

    const { task } = result;

    if(user_id !== this.testId) {
      await createActionHistory(task.id, task.board_id, task.nameTaskList, user_id, 'fixing_a_task');
    }

    return task;
  }

  async delete(task_id) {
    return await Task.destroy({ where: { id: task_id } });
  }

  async getHistory(task_id) {
    const getHistoryTask = await HistoryAction.findAll({ where: { task_id } });
    return getHistoryTask;
  }

  async fetchAssignedUsers(task_id, board_id) {
    const usersTask = await user_tasks.findAll({ where: { task_id } });
    const owner = await user_board.findOne({ where: { owner: true, board_id } });
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

    const dbUserBoard = await user_board.findAll({
      where: { board_id },
      include: [{
        model: User,
        attributes: ['id', 'name'],
      }],
    });

    const users = dbUserBoard.map((board) => {
      const { id, name } = board.User.get({ plain: true });
      return { id, name };
    });


    return {
      allUsers: users, userAssigned: users_task,
      owner: { id: user.id, name: user.name },
    };
  }

  async createAssignedUser(task_id, user_id, board_id) {
    const dbUser = await User.findOne({ where: { id: user_id } });
    const exists = await user_tasks.findOne({ where: { task_id, user_id } });
    const dbTask = await Task.findOne({ where: { id: task_id } });

    if (exists) {
      return { exist: 'user has already been added' };
    }
    await user_tasks.create({ task_id, user_id, active: true, board_id });
    await createActionHistory(task_id, board_id, dbTask.nameTaskList, user_id, 'assigned_users');

    return { id: user_id, name: dbUser.dataValues.name };
  }

  async deleteAssignedUser(user_id, task_id) {
    const user = await User.findOne({ where: { id: user_id } });
    const task = await Task.findOne({ where: { id: task_id } });

    await user_tasks.destroy({ where: { task_id, user_id } });

    return { id: task.id, name: user.name, nameTaskList: task.nameTaskList };
  }

  async leaveTask(user_id, task_id) {
    // const access = this.authorizeAccess();
    await user_tasks.destroy({ where: { task_id, active: true } });
  }

  async returnTaskColumn(task_id, column) {
    await Task.update({ nameTaskList: column, archive: false }, { where: { id: task_id } });
    const task = await Task.findOne({ where: { id: task_id } });
    return task;
  }

  async authorizeAccess(user_id, board_id) {
    const dbUserBoard = await user_board.findOne({
      where: { user_id, board_id },
      attributes: ['owner'],
    });
    return dbUserBoard.get({ plain: true });
  };
}

module.exports = new TaskService();
