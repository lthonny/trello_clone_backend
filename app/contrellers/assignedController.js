const assignedService = require('../services/assignedService');

class AssignedController {
  async removeAssignedUser(req, res, next) {
    try {
      const qqz = await assignedService.remove(req.params.id);
      return res.json(qqz);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AssignedController();