const { Task, user_tasks, Board, User, user_board } = require('../models/index');
const boardService = require('../services/boardService');


class Tasks {
  id;
  title;
  description;
  createdAt;
  updatedAt;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.description = model.description;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}


class TaskService {

  async fetchOne(id) {
    const task = await Task.findOne({ where: { id } });
    return task;
  }

  async fetchAll(id) {
    const tasks = await Board.findByPk(id, {
      // include: [
      //   // {
      //   //   model: user_board,
      //   //   where: {
      //   //     user_id: id,
      //   //   },
      //   // },
      //   {
      //     model: Task,
      //     where: {
      //       board_id: id
      //     },
      //   },
      // ],
    });

    return tasks;
  }

  async create(id, date) {
    const { title, description, nameTaskList, board_id } = date;
    const task = await Task.create({ title, description, nameTaskList, board_id });
    const userTask = await user_tasks.create({ task_id: task.id, user_id: id });

    return task;
  }

  async update(id, data) {

    const { nameList } = data;

    const task = await Task.update({ nameTaskList: nameList }, { where: { id: data.data.id } });
    const updated = await Task.findOne({ where: { id: data.data.id } });

    return updated;
  }

  async updateOrder(idBoard, tasks) {
    for (const { id, title, description, nameTaskList, board_id } of tasks) {
      console.log(id, title, description, nameTaskList, board_id);
      // await Task.update({ id, title, description, nameTaskList, board_id }, { where: { id: idBoard } });
    }

    const updateTasks = await Board.findAll({
      include: {
        model: user_board,
        where: {
          user_id: idBoard
        },
      }
    })

    console.log(updateTasks)

    return updateTasks;
  }

  async delete(id) {
    return await Task.destroy({ where: { id: id } });
  }

}

module.exports = new TaskService();