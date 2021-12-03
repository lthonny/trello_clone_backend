const boardService = require('../services/boardService');

class BoardController {
  async getBoardTasks(req, res) {
    try {
      const board = await boardService.fetchOne(Number(req.params.id), Number(req.decoded.id));
      return res.status(200).json(board);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async getBoards(req, res) {
    try {
      const boardTasks = await boardService.fetchAll(Number(req.decoded.id));

      if (!boardTasks) {  // не нужная проверка
        return res.status(204).json([]);
      }

      return res.status(200).send(boardTasks);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async getInviteLink(req, res) {
    try {
      const key = await boardService.getInviteLink(req.params.id);
      return res.status(201).json(key);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async getInviteBoard(req, res) {
    try {
      const board = await boardService.getInviteBoard(req.decoded.id, req.params.key);
      return res.status(200).json(board);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async createBoard(req, res) {
    try {
      const { name } = req.body;
      const board = await boardService.create(Number(req.decoded.id), name);
      res.status(201).send(board);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async updateBoard(req, res) {
    try {
      const { title } = req.body;
      const board = await boardService.update(req.params.id, title, req.decoded.id);
      res.status(200).send(board);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async deleteBoard(req, res) {
    try {
      await boardService.delete(req.params.id, Number(req.decoded.id));
      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  async deleteTasksColumn(req, res) {
    try {
      const { id, type } = req.params;
      const tasks = await boardService.removeAll(id, type);
      return res.status(200).json(tasks);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async deleteUserAccess(req, res) {
    try {
      const { id, user } = req.params;
      await boardService.deleteUserAccess(user, id);
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async leaveBoard(req, res) {
    try {
      await boardService.leaveBoard(req.decoded.id, req.params.id);
      return res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new BoardController();
