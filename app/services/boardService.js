const { Board, user_board, Task, User } = require('../models/index');
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

  async update(id, title, idUser) {
    // console.log('BOARD ID->>', id);
    const user = await User.findOne({where: {id: idUser}});
    // console.log('USER ID->>', user);
    const board = await user_board.findOne({where: {user_id: user.id}});

    if(!board.owner)
    {
      console.log('false');
      await Board.update({ title }, { where: { id } });
      return { id: id, title: title, owner: true };
    }
    else
    {
      const board = await Board.findOne({where: {id}});
      if(board.title !== title)
      {
        console.log('true');
        return { id: id, title: title, owner: false };
      }
    }
  }

  async delete(id) {
    return await Board.destroy({ where: { id } });
  }
}

module.exports = new BoardService();