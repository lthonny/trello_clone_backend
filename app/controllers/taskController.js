const taskService = require('../services/task/taskService');
const dragAndDrop = require('../services/dragDrop');

class TaskController {
  async createTask(req, res) {
    try {
      const access = await taskService.authorizeAccess(Number(req.decoded.id), req.body.data.board_id);
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
      console.log(await taskService.delete(req.params.id));
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

  async getAllAssignedUsers(req, res) {
    try {
      const { id, board_id } = req.params;
      return res.status(200).json(await taskService.fetchAssignedUsers(id, board_id));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async createAssignedUser(req, res) {
    try {
      const { id, user_id } = req.params;
      return res.status(200).json(await taskService.createAssignedUser(user_id, id, Number(req.body.board_id)));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async deleteAssignedUser(req, res) {
    try {
      const { id, userId } = req.params;
      return res.status(200).json(await taskService.deleteAssignedUser(userId, id));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const data = await dragAndDrop._newUpdateOrder(req.decoded.id, req.body.data);
      res.status(200).json(data);
    } catch (e) {
      res.status(500);
    }
  }

  async updateColumn(req, res) {
    try {
      const data = await dragAndDrop.newUpdateColumn(req.decoded.id, req.params.id, req.body.data, req.body.nameTaskList);
      res.status(200).json(data);
    } catch (e) {
      res.sendStatus(500);
    }
  }

  async leaveTask(req, res) {
    try {
      const data = await taskService.leaveTask(req.decoded.id, req.params.id);
      res.sendStatus(204);
    } catch (e) {
      res.sendStatus(500);
    }
  }

  async returnTaskColumn(req, res) {
    try {
      const task = await taskService.returnTaskColumn(req.params.id, req.body.column);
      res.status(200).json(task);
    } catch (e) {
      res.sendStatus(500);
    }
  }
}

module.exports = new TaskController();
