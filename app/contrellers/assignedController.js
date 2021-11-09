const assignedService = require('../services/assignedService');

class AssignedController {
  async assignedUsers(req, res, next) {
    try {
      const { data } = req.body;
      const users = await assignedService.fetch(data);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async createAssignedUser(req, res, next) {
    try {
      const { data } = req.body;
      const user = await assignedService.create(data);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async removeAssignedUser(req, res, next) {
    try {
      const { data } = req.body;
      const users = await assignedService.remove(data);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AssignedController();