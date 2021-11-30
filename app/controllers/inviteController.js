const inviteService = require('../services/invite/inviteService');
const accessService = require('../services/accessService');

class InviteController {
  async invite(req, res, next) {
    try {
      const key = await inviteService.create(req.body.id);
      return res.status(200).json(key);
    } catch (e) {
      next(e);
    }
  }

  async getBoard(req, res, next) {
    try {
      const { key } = req.body;
      const board = await inviteService.inviteBoard(req.decoded.id, key);
      return res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  }

  async invitedUsers(req, res, next) {
    try {
      const access = await accessService(req.decoded.id);

      if(!access) {
        return res.sendStatus(204);
      }

      const users = await inviteService.users(req.params.id);
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  async owner(req, res, next) {
    try {
      const owner = await inviteService.owner(req.decoded.id, req.params.id);

      if (!owner) {
        return res.sendStatus(204);
      }

      return res.status(200).json(owner);
    } catch (e) {
      next(e);
    }
  }

  async leaveBoard(req, res, next) {
    try {
      await inviteService.remove(req.decoded.id, req.params.id);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  async removeInvited(req, res, next) {
    try {
      const access = await accessService(req.decoded.id);

      if(!access) {
        return res.sendStatus(204);
      }

      await inviteService.remove(req.body.user_id, req.params.id);
      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new InviteController();
