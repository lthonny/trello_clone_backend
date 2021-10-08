const { Task, user_tasks } = require('../models/index');

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

class TaskController {
  async task(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({ where: { id } });

      return res.json(task);
    } catch (e) {
      next(e);
    }
  }

  async tasks(req, res, next) {
    try {
      const { id } = req.params;

      const getTasks = await Task.findAll({ include: { model: user_tasks, where: { user_id: id } } });

      const tasks = getTasks.map(({id, title, description, createdAt, updatedAt}) => {
        return new Tasks({ id, title, description, createdAt, updatedAt});
      })

      return res.status(200).send(tasks);
    } catch (e) {
      next(e);
    }
  }

  async createTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const task = (await Task.create({ title, description })).get();
      const userTask = await user_tasks.create({ task_id: task.id, user_id: id });
      return res.status(200).send(task);
    } catch (e) {
      next(e);
    }
  }

  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const task = await Task.update({ title, description }, { where: { id } });
      const updated = await Task.findOne({ where: { id } });

      return res.json(updated);
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      await Task.destroy({ where: { id } });
      return res.json('ok');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();