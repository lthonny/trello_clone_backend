const { Board, user_board, Task } = require('../models/index');
const { Op } = require('sequelize');

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

class BoardService {
  async fetchOne(id) {
    const board = await Board.findByPk(id, {
      include: [
        {
          model: Task,
          where: {
            board_id: id,
          },
        },
      ],
    });

    const title = board.dataValues.title;
    return { id: id, title, 'tasks': board.Tasks };
  }

  async fetchAll(id) {
    const getBoards = await Board.findAll({
      include: {
        model: user_board,
        where: {
          user_id: id,
        },
      },
    });

    const boards = getBoards.map(({ id, title, createdAt, updatedAt }) => {
      return new Boards({ id, title, createdAt, updatedAt });
    });

    return boards;
  }

  async create(id, name) {
    const board = await Board.create({ title: name });
    const userBoard = await user_board.create({ board_id: board.id, user_id: id, owner: true });

    return board;
  }

  async update(id, title) {
    const user = await user_board.findOne({ where: { board_id: id } });

    console.log('user', user.user_id);

    const admin = await user_board.findAll({
      where: {
        [Op.and]: [
          { user_id: user.user_id },
          { board_id: id },
          { owner: true },
        ],
      },
    });

    if (admin[0].dataValues.owner) {
      await Board.update({ title }, { where: { id } });
      return Board.findOne({ where: { id } });
    } else {
      console.log(admin[0].dataValues.owner);
      return 'Вы не админ доски';
    }
  }

  async delete(id) {
    return await Board.destroy({ where: { id } });
  }
}

module.exports = new BoardService();