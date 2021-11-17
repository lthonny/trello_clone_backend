const { Task, user_tasks, Board, Transaction, User, user_board } = require('../models/index');
const { where } = require('sequelize');

class Tasks {
  id;
  title;
  description;
  createdAt;
  updatedAt;
  order;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.description = model.description;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.order = model.order;
  }
}


class TaskService {

  async fetchOne(id) {
    const task = await Task.findOne({ where: { id } });
    return task;
  }

  async fetchAll(id) {
    const tasks = await Board.findByPk(id, {});
    return tasks;
  }

  async create(id, data) {
    const { title, description, nameTaskList, board_id, order } = data;

    const task = await Task.create({ title, description, nameTaskList, board_id, order: order, archive: false });

    const user = await User.findOne({ where: { id } });

    // console.log(user.id);

    // await user_tasks.create({
    //   where: {
    //     task_id: task.id,
    //     user_id: user.id,
    //     active: false
    //   }
    // });

    await Transaction.create({
      task_id: task.id,
      column: nameTaskList,
      name_user: user.name,
      board_id,
      transaction: 'creation',
    });

    return task;
  }

  async updateTask(id, data) {
    const { nameList, order } = data;

    const taskUpdate = await Task.update({
      nameTaskList: nameList, order: order,
    }, {
      where: { id: data.data.id },
    });

    const task = await Task.findOne({
      where: { nameTaskList: nameList, id: data.data.id },
    });

    console.log(task);

    const updated = await Task.findOne({
      where: { id: data.data.id },
    });

    const userTasks = await user_tasks.findOne({
      where: { task_id: task.id }
    });

    const user = await User.findOne({ where: { id: userTasks.user_id } });

    // const user_boards = await user_board.findOne({
    //   where: { board_id: task.board_id, owner: true },
    // });
    //
    // console.log(user_boards);

    await Transaction.create({
      task_id: task.id,
      column: task.nameTaskList,
      name_user: user.name,
      board_id: task.board_id,
      transaction: 'moving',
    });

    return updated;
  }

  // async update(boardId, data) {
  //   const { id, description, nameList, order } = data;
  //
  //   const task = await Task.findOne()
  //
  //   if(task) {
  //
  //   }
  //
  //   // const task = Task.update({})
  //
  //   return task;
  // }

  async updateTitle(id, title) {
    await Task.update({ title: title }, { where: { id } });
    const task = await Task.findOne({ where: { id } });

    return task;
  }

  async updateDescription(id, description) {
    await Task.update({ description }, { where: { id } });
    const updated = await Task.findOne({ where: { id } });

    const task = await Task.findOne({ where: { id } });
    const userTasksModel = await user_tasks.findOne({ where: { task_id: task.id } });
    // console.log(user_tasks);
    const user = await User.findOne({ where: { id: userTasksModel.user_id } });

    await Transaction.create({
      task_id: task.id,
      column: task.nameTaskList,
      name_user: user.name,
      board_id: task.board_id,
      transaction: 'fixing_a_task',
    });

    return updated;
  }

  async updateOrder(id, data) {
    const updateTasks = data.map(({ id, title, description, createdAt, updatedAt, board_id, order }) => {
      return new Tasks({ id, title, description, createdAt, updatedAt, board_id, order });
    });

    async function processArray(updateTasks) {
      for (const task of updateTasks) {
        await Task.update({ order: task.order }, { where: { id: task.id } });
        ;
      }
    }

    await processArray(updateTasks);

    const board = await Board.findByPk(id, {
      include: [
        {
          model: Task,
          where: {
            board_id: data[0].board_id,
          },
        },
      ],
    });

    return { id: id, 'tasks': board.Tasks };
  }

  async getArchive(id) {
    const board = await Board.findByPk(id, {
      include: [
        {
          model: Task,
          where: {
            board_id: id,
          },
        },
      ],
    });

    if (board !== null) {
      const tasks = board.Tasks.map((task) => {
        if (task.archive !== false && task.archive !== null) {
          return task;
        }
      }).filter((task) => task);

      return { 'idBoard': board.dataValues.id, 'nameBoard': board.dataValues.title, 'tasks': tasks };
    } else {
      return { error: 'задач для архивации нет' };
    }
  }

  async setArchive(data) {
    await Task.update({ archive: !data.archive }, { where: { id: data.id } });
    const task = await Task.findOne({ where: { id: data.id } });
    return task;
  }

  async delete(id) {
    return await Task.destroy({ where: { id: id } });
  }

  async removeAll(id, nameTaskList) {
    await Task.destroy({ where: { board_id: id, nameTaskList } });
    return { ok: 'all tasks in this column have been deleted' };
  }
}

module.exports = new TaskService();