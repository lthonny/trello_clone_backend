const { sequelize, Task } = require('../models/index');
const createActionHistory = require('../services/task/actionHistory');

class dragDrop {
  async newUpdateColumn(user_id, task_id, { topTaskId, currentTaskId, bottomTaskId }, column) {
    return sequelize.transaction(async (transaction) => {

      const currentTask = await Task.findOne({ where: { id: currentTaskId }, transaction });
      let { order } = currentTask;

      await createActionHistory(currentTaskId, currentTask.board_id, currentTask.nameTaskList, user_id, 'moving');

      if (topTaskId === null && bottomTaskId !== null) {
        const bottomTask = await Task.findOne({ where: { id: bottomTaskId }, transaction });
        order = (bottomTask.order / 2);

        return await Task.update({ nameTaskList: column, order },
          { where: { id: task_id }, transaction },
        );
      }

      if (bottomTaskId === null && topTaskId !== null) {
        const topTask = await Task.findOne({ where: { id: topTaskId }, transaction });
        order = (topTask.order + 1);

        return await Task.update({ nameTaskList: column, order },
          { where: { id: task_id }, transaction },
        );
      }

      if (topTaskId === null && bottomTaskId === null) {
        return await Task.update({ nameTaskList: column, order: 0 },
          { where: { id: task_id }, transaction },
        );
      }

      const topTask = await Task.findOne({ where: { id: topTaskId }, transaction });
      const bottomTask = await Task.findOne({ where: { id: bottomTaskId }, transaction });
      order = (topTask.order + bottomTask.order) / 2;

      return await Task.update({ nameTaskList: column, order },
        { where: { id: task_id }, transaction },
      );
    });
  }

  async _newUpdateOrder(user_id, { topTaskId, currentTaskId, bottomTaskId }) {
    return sequelize.transaction(async (transaction) => {
      const currentTask = await Task.findOne({ where: { id: currentTaskId }, transaction });
      let { order } = currentTask;

      await createActionHistory(currentTaskId, currentTask.board_id, currentTask.nameTaskList, user_id, 'moving');

      if (topTaskId === null) {
        const bottomTask = await Task.findOne({ where: { id: bottomTaskId }, transaction });
        order = (bottomTask.order / 2);
        currentTask.order = order;

        return currentTask.save();
      }
      ;

      if (bottomTaskId === null) {
        const topTask = await Task.findOne({ where: { id: topTaskId }, transaction });
        order = (topTask.order + 1);
        currentTask.order = order;

        return currentTask.save();
      }
      ;

      const topTask = await Task.findOne({ where: { id: topTaskId }, transaction });
      const bottomTask = await Task.findOne({ where: { id: bottomTaskId }, transaction });
      order = (topTask.order + bottomTask.order) / 2;
      currentTask.order = order;

      return currentTask.save();
    });
  }

}

module.exports = new dragDrop();
