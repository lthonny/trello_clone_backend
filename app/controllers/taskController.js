const taskService = require('../services/taskService');

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.create(Number(req.decoded.id), req.body.data);
      return res.status(200).send(task);
    } catch (e) {
      next(e);
    }
  }

  async updateTitle(req, res, next) {
    try {
      const { id, title } = req.body;
      const task = await taskService.updateTitle(id, title);
      return res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body, Number(req.decoded.id));
      return res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const task = await taskService.updateOrder(Number(req.decoded.id), req.body);
      return res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  }

  async updateDescription(req, res, next) {
    try {
      const { post } = req.body;
      const task = await taskService.updateDescription(Number(req.decoded.id), post.id, post.description);
      return res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.delete(req.params.id);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  async removeTasks(req, res, next) {
    try {
      await taskService.removeAll(req.params.id, req.body.nameTaskList);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();
