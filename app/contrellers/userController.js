class UserController {
  async signin(req, res, next) {
    try {
      const {email, password} = req.body;

      return res.json({email, password});
    } catch (e) {
      next(e);
    }
  }

  async signup(req, res, next) {
    try {
      const {email, password} = req.body;

      return res.json({email, password});
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      return res.json('logout');
    } catch (e) {
      next(e);
    }
  }

  async isauth(req, res, next) {
    try {
      return res.json('isauth');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
