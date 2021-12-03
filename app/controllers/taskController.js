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
      const { title } = req.body;
      const task = await taskService.updateTitle(req.params.id, title);
      return res.status(200).json(task);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateColumn(req, res) {
    try {
      const { nameTaskList, order } = req.body;
      await taskService.updateTask(Number(req.decoded.id), req.params.id, nameTaskList, order);
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const {} = req.body;
      await taskService.updateOrder(Number(req.decoded.id), req.body.data);
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateDescription(req, res) {
    try {
      const { description } = req.body;
      const task = await taskService.updateDescription(Number(req.decoded.id), req.params.id, description);
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

  async getHistory(req, res) {
    try {
      const actionHistory = await taskService.getHistory(req.params.id);
      return res.status(200).json(actionHistory);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async assignedUsers(req, res) {
    try {
      return res.status(200).json(await taskService.fetchAssignedUsers(req.body));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async createAssignedUser(req, res) {
    try {
      return res.status(200).json(await taskService.createAssignedUser(req.body));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async removeAssignedUser(req, res) {
    try {
      return res.status(200).json(await taskService.deleteAssignedUser(req.body));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new TaskController();
