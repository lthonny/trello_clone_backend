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
          console.log('task', task.dataValues);

          tasks = tasks.filter((item) => {
            console.log(item.id === task.id, 'task id', task.id);
            if(item.id === task.id) {
              // tasks.splice(1, item)
            } else {
              return item;
            }

            // return task.id === task.id
          })

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


    joinTasks.forEach((task) => tasks.push(task));

    // const arr = tasks.filter(item => {

      // joinTasks = joinTasks.filter((kk => {
      //     return item.id !== kk.id;
      // }));

      // console.log(item.id, joinTasks[i].id)
    // });
    // console.log('arr', joinTasks);

    // let numbers = tasks.filter((n) => {return n.id != joinTasks.id});
    // console.log('numbers', numbers);
    // tasks.splice(joinTasks.id);

    // tasks = tasks.filter(d => !joinTasks.includes(d.id))

    // let intersection = tasks.filter(x => joinTasks.includes(x));
    // console.log('intersection', intersection);

    // const c = tasks.filter(n => joinTasks.indexOf(n) === -1);
    // console.log('ccccccc', c);

    return {
      id: id,
      title: board.dataValues.title,
      'tasks': tasks,
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