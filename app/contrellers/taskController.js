const taskService = require('../services/taskService');

class TaskController {
  async task(req, res, next) {
    try {
      return res.status(200).json(
        await taskService.fetchOne(req.params.id),
      );
    } catch (e) {
      next(e);
    }
  }

  async tasks(req, res, next) {
    try {
      return res.status(200).send(
        await taskService.fetchAll(req.params.id),
      );
    } catch (e) {
      next(e);
    }
  }

  async createTask(req, res, next) {
    try {
      const { title, description, nameTaskList, board_id, order } = req.body;
      return res.status(200).send(
        await taskService.create(req.params.id,
          { title, description, nameTaskList, board_id, order },
        ),
      );
    } catch (e) {
      next(e);
    }
  }

  async titleUpdate(req, res, next) {
    try {
      const { id, title } = req.body;
      return res.status(200).json(
        await taskService.updateTitle(id, title),
      );
    } catch (e) {
      next(e);
    }
  }

  async updateTask(req, res, next) {
    try {
      return res.status(200).json(
        await taskService.updateTask(req.params.id, req.body),
      );
    } catch (e) {
      next(e);
    }
  }

  async updateDescription(req, res, next) {
    try {
      const { userId, post } = req.body;
      return res.status(200).json(
        await taskService.updateDescription(userId, post.id, post.description),
      );
    } catch (e) {
      next(e);
    }
  }

  async updateOrder(req, res, next) {
    try {
      return res.status(200).json(
        await taskService.updateOrder(req.params.id, req.body),
      );
    } catch (e) {
      next(e);
    }
  }

  async fetchArchive(req, res, next) {
    try {
      return res.status(200).json(
        await taskService.getArchive(req.params.id),
      );
    } catch (e) {
      next(e);
    }
  }

  async createArchive(req, res, next) {
    try {
      return res.status(200).json(
        await taskService.setArchive(req.body),
      );
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.delete(req.params.id);
      return res.status(200);
    } catch (e) {
      next(e);
    }
  }

  async removeTasks(req, res, next) {
    try {
      return res.status(200).json(
        await taskService.removeAll(req.params.id, req.body.nameTaskList),
      );
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();