const { Task, Transaction, User } = require('../models/index');

class ModelTasks {
  id;
  title;
  description;
  createdAt;
  updatedAt;
  order;
  archive;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.description = model.description;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.order = model.order;
    this.archive = model.archive;
  }
}

class TaskService {
  async create(id, data) {
    const { title, description, nameTaskList, board_id, order } = data;

    const task = await Task.create({
      title,
      description,
      nameTaskList,
      board_id,
      order: order,
      archive: false,
    });

    const user = await User.findOne({ where: { id } });

    await Transaction.create({
      task_id: task.id,
      column: nameTaskList,
      name_user: user.name,
      board_id,
      transaction: 'creation',
    });

    return task;
  }

  async updateTask(id, data, user_id) {
    const { nameList, order } = data;

    await Task.update(
      {
        nameTaskList: nameList,
        order: order,
      },
      {
        where: { id: data.data.id },
      },
    );

    const task = await Task.findOne({
      where: { nameTaskList: nameList, id: data.data.id },
    });

    const updated = await Task.findOne({
      where: { id: data.data.id },
    });

    const user = await User.findOne({ where: { id: user_id } });

    await Transaction.create({
      task_id: task.id,
      column: task.nameTaskList,
      name_user: user.name,
      board_id: task.board_id,
      transaction: 'moving',
    });

    return updated;
  }

  async updateTitle(id, title) {
    await Task.update({ title: title }, { where: { id } });
    const task = await Task.findOne({ where: { id } });

    return task;
  }

  async updateDescription(user_id, id, description) {
    await Task.update({ description }, { where: { id } });
    const updated = await Task.findOne({ where: { id } });

    const task = await Task.findOne({ where: { id } });
    const user = await User.findOne({ where: { id: user_id } });

    await Transaction.create({
      task_id: task.id,
      column: task.nameTaskList,
      name_user: user.name,
      board_id: task.board_id,
      transaction: 'fixing_a_task',
    });

    return updated;
  }

  async updateOrder(user_id, data) {
    const updateTasks = data.map(
      ({
         id,
         title,
         description,
         createdAt,
         updatedAt,
         board_id,
         order,
         archive,
       }) => {
        return new ModelTasks({
          id,
          title,
          description,
          createdAt,
          updatedAt,
          board_id,
          order,
          archive,
        });
      },
    );

    async function processArray(updateTasks) {
      for (const task of updateTasks) {
        await Task.update({ order: task.order }, { where: { id: task.id } });
      }
    }

    await processArray(updateTasks);
    let boardId = data[0].board_id;

    let tasks = await Task.findAll({
      where: {
        board_id: boardId,
      },
    });
    return { id: user_id, tasks: tasks.dataValues };
  }

  async delete(id) {
    await Task.destroy({ where: { id: id } });
  }

  async removeAll(id, nameTaskList) {
    await Task.destroy({ where: { board_id: id, nameTaskList } });
  }
}

module.exports = new TaskService();
