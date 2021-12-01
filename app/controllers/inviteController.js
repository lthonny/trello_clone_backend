const inviteService = require('../services/invite/inviteService');

class InviteController {
  async invite(req, res) {
    try {
      const key = await inviteService.create(req.params.id);
      return res.status(201).json(key);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async getBoard(req, res) {
    try {
      const board = await inviteService.fetchBoard(req.decoded.id, req.params.key);
      return res.status(200).json(board);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async invitedUsers(req, res) {
    try {
      const access = await inviteService.authorizeAccess(Number(req.decoded.id), Number(req.params.id));

      if(!access) {
        return res.status(200).json([]);
      }

      const users = await inviteService.fetchUsers(req.params.id, access);
      return res.status(200).json(users);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async owner(req, res) {
    try {
      const owner = await inviteService.owner(req.decoded.id, req.params.id);

      if (!owner) {
        return res.sendStatus(204);
      }

      return res.status(200).json(owner);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async leaveBoard(req, res) {
    try {
      await inviteService.remove(req.decoded.id, req.params.id);
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async removeInvited(req, res) {
    try {
      const access = await inviteService.authorizeAccess(req.decoded.id, req.params.id);

      if(!access) {
        return res.sendStatus(204);
      }

      await inviteService.remove(req.body.user_id, req.params.id, access);
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new InviteController();
