const assignedService = require('../services/assignedService');

class AssignedController {
  async assignedUsers(req, res, next) {
    try {
      const users = await assignedService.fetch(req.params.id);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async addAssignedUser(req, res, next) {
    try {
      const { userId } = req.body;
      const users = await assignedService.add(userId, req.params.id);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async removeAssignedUser(req, res, next) {
    try {
      const users = await assignedService.remove(req.params.id);
      return res.json(['user delete']);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AssignedController();