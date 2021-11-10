const googleService = require('../services/googleService');
const userGoogleService = require('../services/userGoogleService');

class GoogleController {
  async singUp(req, res, next) {
    try {
      const { name, email } = req.body;

      const userData = await userGoogleService.sign_up(name, email);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false
      });

      return res.json(userData);
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