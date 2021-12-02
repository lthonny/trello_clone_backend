const { sequelize, Task, User, user_board } = require('../../models');
const createActionHistory = require('../history/actionHistory');
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

      const user = await User.findOne({ where: { id: user_id }, transaction });

      return { task, user };
    });

    const { task, user } = await result;

    await createActionHistory(task.id, board_id, nameTaskList, user.name, 'creation'); // не под транзакцией, хранить user_id, вынести в enum creation и остальные типы операций
    return task;
  }

  async updateTask({ task_id, nameTaskList, order }, user_id) {
    const result = await sequelize.transaction(async (transaction) => {
      await Task.update({ nameTaskList, order },
        { where: { id: task_id }, transaction }
      );

      const user = await User.findOne({
        where: { id: user_id }, transaction,
      });

      const task = await Task.findOne({
        where: { nameTaskList, id: task_id }, transaction,
      });

      return { task, user };
    });

    const { task, user } = await result;

    await createActionHistory(task.id, task.board_id, task.nameTaskList, user.name, 'moving');

    return task;
  }

  async updateTitle(task_id, title) {
    const result = await sequelize.transaction(async (transaction) => {
      await Task.update({ title }, { where: { id: task_id }, transaction });
      const task = await Task.findOne({ where: { id: task_id }, transaction });

      return task;
    });

    const { task } = await result;
    return task;
  }

  async updateDescription(user_id, task_id, description) {

    const result = await sequelize.transaction(async (transaction) => {
      await Task.update({ description }, { where: { id: task_id }, transaction });
      const updated = await Task.findOne({ where: { id: task_id }, transaction });

      const task = await Task.findOne({ where: { id: task_id }, transaction });
      const user = await User.findOne({ where: { id: user_id }, transaction });

      return { task, user, updated };
    });

    const { task, user, updated } = result;

    await createActionHistory(task.id, task.board_id, task.nameTaskList, user.name, 'fixing_a_task');

    return updated;
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

  async removeAll(board_id, nameTaskList, access) {
    if (!access.owner) {
      return [];
    }
    return await Task.destroy({ where: { board_id, nameTaskList } });
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
