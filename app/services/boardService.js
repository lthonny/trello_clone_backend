const { Board, user_board, Task, User, Invites, user_tasks } = require('../models/index');
const { Op, where } = require('sequelize');

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
    let board = await Board.findByPk(id, {
      include: [
        { model: Task, where: { board_id: id } },
      ],
    });
    /*** get all tasks ***/
    let tasks = board.Tasks.map((task) => task.dataValues);
    console.log('get all tasks', tasks);

    /*** check if there are tasks on the board ***/
    if (board === null) {
      return { error: 'в таблице нет задач' };
    }

    /*** get all tasks to which users are assigned ***/
    const activeTasks = (await user_tasks.findAll({ where: { board_id: id } })).map(data => {
      if (data.active) {
        if (data.board_id === Number(id)) {
          return data.dataValues;
        }
      }
    }).filter((task) => task);

    // console.log('get all tasks to which users are assigned', activeTasks);

    /*** concatenating tables to get tasks ***/

    // const a = ['a', 'b', 'c', 'd'];
    // const b = ['a', 'b', 'x', 'y', 'z'];
    //
    // const c = tasks.filter(n => activeTasks.indexOf(n) === -1);
    // console.log(c);

    let idx = activeTasks.map((task, i) => {
      return { task_id: task.task_id, user_id: task.user_id };
    });

    let joinTasks = [];
    for (let i = 0; i < idx.length; i++) {
      const task = await Task.findOne({ where: { id: idx[i].task_id } });
      const userModal = await User.findOne({ where: { id: idx[i].user_id } });
      if (userModal.dataValues) {
        const user = {
          id: userModal.dataValues.id,
          name: userModal.dataValues.name,
          email: userModal.dataValues.email,
        };
        if (task) {
          joinTasks.push({
            id: task.id,
            title: task.title,
            description: task.description,
            nameTaskList: task.nameTaskList,
            board_id: task.board_id,
            order: task.order,
            active: [user],
          });
        }
      }
    }

    console.log('concatenating', joinTasks);
    const joinTasksId = joinTasks.map((task) => task.id);
    console.log(joinTasksId);

    // tasks = tasks.filter((task, i) => {
      // console.log(task.id !== joinTasksId[i]);
      // if(task.id !== joinTasksId[i]) {
      //   return task;
      // }
      // if(task.id === joinTasksId[i]) {
      //   return joinTasksId[i];
      // } else {
      //   return task;
      // }
        // console.log(task.id, joinTasks[i].id);
      // if(task.id === joinTasks[i]) {
      //   return joinTasks[i];
      // }
    // })

    let result = tasks.filter((item, index, array) => {
      if(item.id === joinTasksId[index]) {
        // return joinTasks.push(item);
      } else {
        return joinTasks.push(item);
      }

      // console.log(item.id !== joinTasksId[index]);

      // return item.id !== joinTasksId[index];
    });

    // joinTasks.push(result);


    console.log(result);

    // joinTasks = joinTasks.filter((task, i) => task.id !== tasks[i].id);
    // console.log(joinTasks);

    // const c = tasks.filter(n => joinTasks.indexOf(n) === -1);
    // console.log('ccccccc', c);

    return {
      id: id,
      title: board.dataValues.title,
      'tasks': joinTasks,
      // activeTasks: joinTasks
    };
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
    const board = await Board.findOne({ where: { id } });
    return board.dataValues;
  }

  async create(id, name) {
    const board = await Board.create({ title: name });
    const userBoard = await user_board.create({ board_id: board.id, user_id: id, owner: true });
    return board.dataValues;
  }

  async update(id, title, idUser) {
    const user = await User.findOne({ where: { id: idUser } });
    const board = await user_board.findOne({ where: { user_id: user.id } });
    // console.log(board.owner);

    if (board.owner) {
      // console.log('false');
      await Board.update({ title }, { where: { id } });
      return { id: id, title: title, owner: true };
    } else {
      const board = await Board.findOne({ where: { id } });
      if (board.title !== title) {
        // console.log('true');
        return { id: id, title: title, owner: false };
      }
    }
  }

  async delete(id) {
    const board = await Invites.findOne({ where: { board_id: id } });

    if (board) {
      await Invites.destroy({ where: { board_id: id } });
    }

    await Board.destroy({ where: { id } });

    return 'board removed';
  }
}

module.exports = new BoardService();