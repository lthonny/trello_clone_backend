const taskService = require('../services/taskService');

class TaskController {
  async task(req, res, next) {
    try {
      console.log('TAKS -> id', req.params.id);

      const task = await taskService.fetchOne(req.params.id);

      return res.json(task);
    } catch (e) {
      next(e);
    }
  }

  async tasks(req, res, next) {
    try {
      const tasks = await taskService.fetchAll(req.params.id);
      return res.status(200).send(tasks);
    } catch (e) {
      next(e);
    }
  }

  async createTask(req, res, next) {
    try {
      const { title, description, nameTaskList, board_id } = req.body;
      const task = await taskService.create(req.params.id, {title, description, nameTaskList, board_id});
      return res.status(200).send(task);
    } catch (e) {
      next(e);
    }
  }

  async updateTask(req, res, next) {
    try {
      const { title, description } = req.body;

      const task = await taskService.update(req.params.id, title, description);
      return res.json(task);
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.delete(req.params.id);
      return res.json('ok');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();