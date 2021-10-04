const userService = require('../services/userServices');

class UserController {
  async signup(req, res, next) {
    try {
      const {name, email, password} = req.body;

      const userData = await userService.sign_up(name, email, password);
      res.cookie('refreshToken', userData.refreshToken, { 
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: false 
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password} = req.body;

      const userData = await userService.sign_in(email, password);
      res.cookie('refreshToken', userData.refreshToken, { 
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false, secure: false 
      });
      
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.status(200).send({message: 'Complete cleaning'});
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      
      const token = await userService.refresh(refreshToken);
      res.cookie('refreshToken', token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false, secure: false
      });

      return res.json(token);
    } catch(e) {
      next(e);
    }
  }

  async isauth(req, res, next) {
    try {
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
