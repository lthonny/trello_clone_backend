const assignedService = require('../services/assignedService');

class AssignedController {
  async assignedUsers(req, res, next) {
    try {
      return res.status(200).json(await assignedService.fetch(req.body));
    } catch (e) {
      next(e);
    }
  }

  async createAssignedUser(req, res, next) {
    try {
      return res.status(200).json(await assignedService.create(req.body));
    } catch (e) {
      next(e);
    }
  }

  async removeAssignedUser(req, res, next) {
    try {
      return res.status(200).json(await assignedService.remove(req.body));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AssignedController();
