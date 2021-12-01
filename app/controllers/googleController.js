const googleService = require('../services/googleService');

class GoogleController {
  async user(req, res, next) {
    try {
      const user = 'Василий';
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async authGoogle() {
    //   try {
    //     const user = await taskService.fetchOne(req.params.id);
    //     return res.json(task);
    //   } catch (e) {
    //     next(e);
    //   }
  }

  async logoutUser(req, res, next) {
    try {
      const user = await googleService.logoutDb();
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GoogleController();
