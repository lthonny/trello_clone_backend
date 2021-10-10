const { Board, user_board, User } = require('../models/index');

const lists = ['To Do', 'In Process', 'Coded', 'Testing', 'Done', 'Archive'];

class Boards {
  id;
  title;
  createdAt;
  updatedAt;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}

class BoardController {

  async taskList (req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.body.userId;

      const tasklists = [];

      const board = await Board.create({name});
      const user = await User.findByPk({id});

      // await

      return res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async board(req, res, next) {
    try {
      const { id } = req.params;
      const board = await Board.findOne({ where: { id } });

      return res.json(board);
    } catch (e) {
      next(e);
    }
  }

  async boards(req, res, next) {
    try {
      const { id } = req.params;
      const getBoards = await Board.findAll({ include: { model: user_board, where: { user_id: id } } });

      const boards = getBoards.map(({ id, title, createdAt, updatedAt }) => {
        return new Boards({ id, title, createdAt, updatedAt });
      });

      return res.status(200).send(boards);
    } catch (e) {
      next(e);
    }
  }

  async createBoard(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const board = (await Board.create({ title: name })).get();
      const userBoard = await user_board.create({ board_id: board.id, user_id: id });
      return res.status(200).send(board);
    } catch (e) {
      next(e);
    }
  }

  async updateBoard(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const board = await Board.update({ title: name }, { where: { id } });
      const updated = await Board.findOne({ where: { id } });

      return res.json(updated);
    } catch (e) {
      next(e);
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const { id } = req.params;

      await Board.destroy({ where: { id } });
      return res.json('ok');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BoardController();
