const { Task, user_tasks, Board, User, user_board } = require('../models/index');
const boardService = require('../services/boardService');
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

  async create(id, data) {
    const { title, description, nameTaskList, board_id, order } = data;
    const task = await Task.create({ title, description, nameTaskList, board_id, order: order, archive: false });

    const userTask = await user_tasks.create({ task_id: task.id, user_id: id });

    return task;
  }

  async update(id, data) {

    const { nameList, order } = data;

    const task = await Task.update({ nameTaskList: nameList, order: order }, { where: { id: data.data.id } });
    const updated = await Task.findOne({ where: { id: data.data.id } });

    return updated;
  }

  async updateDescription(id, description) {
    await Task.update({description}, {where: {id}});
    const updated = await Task.findOne({ where: { id } });

    console.log(updated)

    return updated;
  }

  async updateOrder(id, data) {
    const updateTasks = data.map(({ id, title, description, createdAt, updatedAt, board_id, order }) => {
      return new Tasks({ id, title, description, createdAt, updatedAt, board_id, order });
    });

    // await updateTasks.forEach((task) => {
    //   return Task.update({order: task.order}, {where: {id: task.id}});
    // })

    async function processArray(updateTasks) {
      for (const task of updateTasks) {
        await Task.update({order: task.order}, {where: {id: task.id}});;
      }
    }
    await processArray(updateTasks);

    const board = await Board.findByPk(id, {
      include: [
        {
          model: Task,
          where: {
            board_id: data[0].board_id
          },
        },
      ],
    });

    return { id: id, "tasks": board.Tasks };
  }

  async getArchive(id) {
      const board = await Board.findByPk(id, {
        include: [
          {
            model: Task,
            where: {
              board_id: id
            },
          },
        ],
      });

      const tasks = board.Tasks.map((task) => {
        if (task.archive !== false && task.archive !== null) {
          return task;
        }
      }).filter((task) => task);

      return { "idBoard": board.dataValues.id, "nameBoard": board.dataValues.title, "tasks": tasks };
  }

  async setArchive(data) {
    await Task.update({archive: !data.archive}, {where: {id: data.id}});
    const task = await Task.findOne({where: {id: data.id}})
    return task;
  }

  async delete(id) {
    return await Task.destroy({ where: { id: id } });
  }
}

module.exports = new TaskService();