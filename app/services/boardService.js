const { Board, user_board, Task, User, Invites, user_tasks } = require('../models/index');
const { Op, where} = require('sequelize');

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

    if(board === null) {
      return {error: 'в таблице нет задач'};
    }
    // if() {

    // const usersTask = await user_tasks.findAll({
    //   where: { task_id: taskId },
    // });

    // let users_task = [];
    // for (let i = 0; i < usersTask.length; i++) {
    //   const user = await User.findOne({ where: { id: usersTask[i].dataValues.user_id } });
    //   users_task.push({ id: user.id, name: user.name });
    // }

    const title = board.dataValues.title;
    return { id: id, title, 'tasks': board.Tasks };
    // }
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

  async getBoard(id) {
    const board = await Board.findOne({where: {id}});
    return board;
  }

  async create(id, name) {
    const board = await Board.create({ title: name });
    const userBoard = await user_board.create({ board_id: board.id, user_id: id, owner: true });

    return board;
  }

  async update(id, title, idUser) {
    const user = await User.findOne({where: {id: idUser}});
    const board = await user_board.findOne({where: {user_id: user.id}});
    console.log(board.owner)

    if(board.owner) {
      console.log('false');
      await Board.update({ title }, { where: { id } });
      return { id: id, title: title, owner: true };
    }
    else {
      const board = await Board.findOne({where: {id}});
      if(board.title !== title)
      {
        console.log('true');
        return { id: id, title: title, owner: false };
      }
    }
  }

  async delete(id) {
    const board = await Invites.findOne({where: {board_id: id}});

    if (board) {
      await Invites.destroy({where: { board_id: id}});
    }

    return await Board.destroy({ where: { id } });
  }
}

module.exports = new BoardService();