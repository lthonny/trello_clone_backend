const googleService = require('../services/googleService');

class GoogleController {
  async singUp(req, res, next) {
    try {
      const {} = req.body;
      const user = await googleService.sign_up();
      return;
    } catch (e) {
      next(e);
    }
  }

  async singIn(req, res, next) {
    try {
      const {} = req.body;
      const user = await googleService.sign_in();
      return;
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GoogleController();