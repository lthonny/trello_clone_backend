const assignedService = require('../services/assigned/assignedService');

class AssignedController {
  async assignedUsers(req, res) {
    try {
      return res.status(200).json(await assignedService.fetch(req.body));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async createAssignedUser(req, res) {
    try {
      return res.status(200).json(await assignedService.create(req.body));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async removeAssignedUser(req, res) {
    try {
      return res.status(200).json(await assignedService.remove(req.body));
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new AssignedController();
