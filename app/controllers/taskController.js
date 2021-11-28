const taskService = require('../services/taskService');

class TaskController {
  async task(req, res, next) {
    try {
      const task = await taskService.fetchOne(req.params.id);
      return res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  }

  async createTask(req, res, next) {
    try {
      const { title, description, nameTaskList, board_id, order } = req.body;
      return res
        .status(200)
        .send(
          await taskService.create(req.params.id, {
            title,
            description,
            nameTaskList,
            board_id,
            order,
          }),
        );
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
      const task = await taskService.updateTask(req.params.id, req.body);
      return res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const task = await taskService.updateOrder(req.params.id, req.body);
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
