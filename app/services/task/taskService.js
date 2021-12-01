const { Task, User, user_board } = require('../../models');
const createActionHistory = require('../history/actionHistory');
const { ModelTasks } = require('../task/modelTask');

class TaskService {
  async create(user_id, data) {
    const { title, description, nameTaskList, board_id, order } = data;

    const task = await Task.create({ title, description, nameTaskList, board_id, order: order, archive: false });

    const user = await User.findOne({ where: { id: user_id } });

    await createActionHistory(Number(task.id), Number(board_id), String(nameTaskList), String(user.name), String('creation'));

    return task;
  }

  async updateTask({ task_id, nameTaskList, order }, user_id) {
    await Task.update({ nameTaskList, order },
      { where: { id: task_id } },
    );

    const user = await User.findOne({
      where: { id: user_id },
    });

    const task = await Task.findOne({
      where: { nameTaskList, id: task_id },
    });

    await createActionHistory(Number(task.id), Number(task.board_id), String(task.nameTaskList), String(user.name),
      String('moving'),
    );

    return task;
  }

  async updateTitle(task_id, title) {
    await Task.update({ title }, { where: { id: task_id } });
    return await Task.findOne({ where: { id: task_id } });
  }

  async updateDescription(user_id, task_id, description) {
    await Task.update({ description }, { where: { id: task_id } });
    const updated = await Task.findOne({ where: { id: task_id } });

    const task = await Task.findOne({ where: { id: task_id } });
    const user = await User.findOne({ where: { id: user_id } });

    await createActionHistory(Number(task.id), Number(task.board_id), String(task.nameTaskList), String(user.name), String('fixing_a_task'));

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
      return null;
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
