const {
  Board,
  user_board,
  Task,
  User,
  Invites,
  user_tasks,
} = require('../models/index');

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
    const dbTasks = await Board.findByPk(id, {
      include: [{
        model: Task,
        where: {
          board_id: id,
        },
      }],
    });

    const tasks = dbTasks.Tasks.map(task => task.get({ plain: true }));

    const users = await Board.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'email'],
          through: {
            attributes: ['owner'],
          },
        },
        // {
        //   model: user_tasks,
        //   include: {
        //     model: Task,
        //     include: [
        //       {
        //         model: User,
        //         attributes: ['id', 'email'],
        //       },
        //     ],
        //   },
        // },

        // {
        //   model: user_board,
        //   where: {
        //     board_id: id,
        //   }
        // }
      ],
      attributes: ['id', 'title'],
    });

    // const qqz = users.Tasks.map(task => task.get({ plain: true }));

    console.log('users', await users);

    // const activeTasks = (await user_tasks.findAll({ where: { board_id: id } }))
    //   .map((data) => {
    //     if (data.active) {
    //       if (data.board_id === Number(id)) {
    //         return data.dataValues;
    //       }
    //     }
    //   })
    //   .filter((task) => task);


    // /*** concatenating tables to get tasks ***/
    // let idx = activeTasks.map((task, i) => {
    //   return { task_id: task.task_id, user_id: task.user_id };
    // });
    //
    // let joinTasks = [];
    // for (let i = 0; i < idx.length; i++) {
    //   const task = await Task.findOne({ where: { id: idx[i].task_id } });
    //   const userModal = await User.findOne({ where: { id: idx[i].user_id } });
    //   if (userModal.dataValues) {
    //     const user = {
    //       id: userModal.dataValues.id,
    //       name: userModal.dataValues.name,
    //       email: userModal.dataValues.email,
    //     };
    //     if (task) {
    //       tasks = tasks.filter((item) => {
    //         if (item.id === task.id) {
    //         } else {
    //           return item;
    //         }
    //       });
    //       joinTasks.push({
    //         id: task.id,
    //         title: task.title,
    //         description: task.description,
    //         nameTaskList: task.nameTaskList,
    //         board_id: task.board_id,
    //         order: task.order,
    //         active: [user],
    //       });
    //     }
    //   }
    // }
    //
    // joinTasks.forEach((task) => tasks.push(task));

    return {
      id: id,
      title: dbTasks.dataValues.title,
      tasks: tasks,
    };
  }

  async fetchAll(id) {
    const dbBoards = await Board.findAll({
      include: [{
        model: user_board,
        where: {
          user_id: id,
        },
      }],
      attributes: ['id', 'title', 'createdAt', 'updatedAt'],
    });

    const boards = dbBoards.map(board => {
      const { id, title, createdAt, updatedAt } = board.get({ plain: true });
      return { id, title, createdAt, updatedAt };
    });

    return boards;
  }

  async getBoard(id) {
    const board = await Board.findOne({ where: { id } });
    if (board) {
      return board.dataValues;
    }
  }

  async create(id, name) {
    const board = await Board.create({ title: name });
    // console.log(board);

    if (board) {
      await user_board.create({ board_id: board.id, user_id: id, owner: true });
      return board.dataValues;
    }
  }

  async update(id, title, user_id) {
    const dbUserBoard = await user_board.findOne({
      where: { user_id, board_id: id },
      attributes: ['owner'],
    });

    const owner = dbUserBoard.get({ plain: true });

    if (owner.owner) {
      await Board.update({ title }, { where: { id } });
      return { id: id, title: title, owner: true };
    } else {
      const board = await Board.findOne({ where: { id } });
      if (board.title !== title) {
        return { id: id, title: title, owner: false };
      }
    }
  }

  async delete(id, user_id) {
    const dbUserBoard = await user_board.findOne({
      where: { user_id, board_id: id },
      attributes: ['owner'],
    });

    const owner = dbUserBoard.get({ plain: true });

    if (owner.owner) {
      await Board.destroy({ where: { id } });
    }
    if (!owner.owner) {
      await user_board.destroy({
        where: { board_id: id, user_id, owner: false },
      });
    }
  }
}

module.exports = new BoardService();
