const taskService = require('../services/task/taskService');

class TaskController {
  async createTask(req, res) {
    try {
      // не работает проверка
      const access = await taskService.authorizeAccess(Number(req.decoded.id), req.body.data.board_id);
// не работает проверка
      if (!access) {
        res.sendStatus(403);
      }

      const task = await taskService.create(Number(req.decoded.id), req.body.data);
      return res.status(201).send(task);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateTitle(req, res) {
    try {
      const { id, title } = req.body;
      const task = await taskService.updateTitle(id, title);
      return res.status(200).json(task);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      await taskService.updateTask(req.body, Number(req.decoded.id));
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      await taskService.updateOrder(Number(req.decoded.id), req.body.data);
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateDescription(req, res) {
    try {
      const { post } = req.body;
      const task = await taskService.updateDescription(Number(req.decoded.id), post.id, post.description);
      return res.status(200).json(task);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      // добавить проверку для доступа
      await taskService.delete(req.params.id);
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async removeTasks(req, res) {
    try {
      const { nameTaskList, board_id } = req.body;
      const access = await taskService.authorizeAccess(Number(req.decoded.id), board_id);

      if (!access) {
        res.sendStatus(403);
      }

      const tasks = await taskService.removeAll(req.params.id, nameTaskList, access);
      return res.status(200).json(tasks);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new TaskController();
