const { sequelize, Task, User, user_board, HistoryAction, user_tasks } = require('../../models');
const createActionHistory = require('./actionHistory');
const { ModelTasks } = require('../task/modelTask');

class TaskService {
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

    await createActionHistory(task.id, board_id, nameTaskList, user_id, 'creation'); // не под транзакцией, хранить user_id, вынести в enum creation и остальные типы операций
    return task;
  }

  async updateTask(user_id, task_id, nameTaskList, order) {
    const result = await sequelize.transaction(async (transaction) => {
      await Task.update({ nameTaskList, order },
        { where: { id: task_id }, transaction },
      );

      const task = await Task.findOne({
        where: { nameTaskList, id: task_id }, transaction,
      });

      return { task };
    });

    const { task } = result;

    await createActionHistory(task.id, task.board_id, task.nameTaskList, user_id, 'moving');

    return task;
  }

  async updateTitle(task_id, title) {
    const result = await sequelize.transaction(async (transaction) => {
      await Task.update({ title }, { where: { id: task_id }, transaction });
      const task = await Task.findOne({ where: { id: task_id }, transaction });

      return task;
    });

    const { task } = result;
    return task;
  }

  async updateDescription(user_id, task_id, description) {

    const result = await sequelize.transaction(async (transaction) => {
      await Task.update({ description }, { where: { id: task_id }, transaction });
      const task = await Task.findOne({ where: { id: task_id }, transaction });
      return { task };
    });

    const { task } = result;

    await createActionHistory(task.id, task.board_id, task.nameTaskList, user_id, 'fixing_a_task');

    return task;
  }

  async updateOrder(user_id, data) {
    const updateTasks = data.map(
      ({ id, title, description, createdAt, updatedAt, board_id, order, archive }) => {
        return new ModelTasks({ id, title, description, createdAt, updatedAt, board_id, order, archive });
      },
    );

    async function processArray(updateTasks) {
      for (const task of updateTasks) {
        await Task.update({ order: task.order }, { where: { id: task.id } });
      }
    }

    await processArray(updateTasks);
  }

  async delete(task_id) {
    return await Task.destroy({ where: { id: task_id } });
  }

  async getHistory(task_id) {
    const getHistoryTask = await HistoryAction.findAll({ where: { task_id } });
    return getHistoryTask;
  }


    async fetchAssignedUsers(task_id, board_id) {
      const usersBoard = await user_board.findAll({ where: { board_id }});
      const usersTask = await user_tasks.findAll({ where: { task_id } });
      const owner = await user_board.findOne({ where: { owner: true, board_id }});
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

  async createAssignedUser(task_id, user_id, board_id) {
    const dbUser = await User.findOne({ where: {id: user_id}});
    const exists = await user_tasks.findOne({ where: { task_id, user_id }});

    if (exists) {
      return { exist: 'user has already been added' };
    } 
    await user_tasks.create({ task_id, user_id, active: true, board_id });
    return { id: user_id, name: dbUser.dataValues.name };
  }

  async deleteAssignedUser(user_id, task_id) {
    console.log(user_id, task_id);
      const user = await User.findOne({where: { id: user_id }});
      const task = await Task.findOne({where: { id: task_id }});
      
      await user_tasks.destroy({where: { task_id, user_id }});
      
      return { id: task.id, name: user.name, nameTaskList: task.nameTaskList };
      
      // await createActionHistory(id, board_id, nameTaskList, user_id, 'no_assigned_users');
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
