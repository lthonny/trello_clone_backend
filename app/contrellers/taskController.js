const taskService = require('../services/taskService');

class TaskController {
  async task(req, res, next) {
    try {
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
      const { title, description, nameTaskList, board_id, order } = req.body;
      const task = await taskService.create(req.params.id, { title, description, nameTaskList, board_id, order });

      return res.status(200).send(task);
    } catch (e) {
      next(e);
    }
  }

  async titleUpdate(req, res, next) {
    try {
      const {id, title} = req.body;
      const task = await taskService.updateTitle(id, title);
      return res.json(task);
    } catch (e) {
      next(e);
    }
  }

  // async updateTask(req, res, next) {
  //   try {
  //     const task = await taskService.update(req.params.id, req.body );
  //     return res.json(task);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  //
  async updateDescription(req, res, next) {
    try {
      const {id, description} = req.body;
      const task = await taskService.updateDescription(id, description);
      return res.json(task);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const task = await taskService.update(req.params.id, req.body);
      return res.json(task);
    } catch (e) {
      next(e);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const tasks = await taskService.updateOrder(req.params.id, req.body);
      return res.json(tasks);
    } catch (e) {
      next(e);
    }
  }

  async fetchArchive(req, res, next) {
    try {
      const tasks = await taskService.getArchive(req.params.id);
      return res.json(tasks);
    } catch (e) {
      next(e);
    }
  }

  async createArchive(req, res, next) {
    try {
      const task = await taskService.setArchive(req.body);
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
      console.log('error', e.message);
      next(e);
    }
  }

  async removeTasks(req, res, next) {
    try {
      const tasks = await taskService.removeAll(req.params.id, req.body.nameTaskList);
      return res.json(tasks);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TaskController();