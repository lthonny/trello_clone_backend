const boardService = require('../services/board/boardService');

class BoardController {
  async tasksBoard(req, res) {
    try {
      const board = await boardService.fetchOne(Number(req.params.id));
      return res.status(200).json(board);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async boards(req, res) {
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

      const access = await boardService.authorizeAccess(Number(req.decoded.id), req.params.id);

      if (!access) {
        res.sendStatus(403);
      }

      const board = await boardService.update(req.params.id, title, req.decoded.id, access);
      res.status(200).send(board);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async deleteBoard(req, res) {
    try {
      const access = await boardService.authorizeAccess(Number(req.decoded.id), req.params.id);

      if (!access) {
        res.sendStatus(403);
      }

      await boardService.delete(req.params.id, Number(req.decoded.id), access);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new BoardController();
