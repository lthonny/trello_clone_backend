const sequelize = require('../models/index');
// const db = require("../config/database");
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  auth_via: { type: DataTypes.STRING, allowNull: false },
});


const Board = sequelize.define('board', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
});


const Task = sequelize.define('task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  board_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  nameTaskList: { type: DataTypes.STRING, allowNull: false },
  archive: { type: DataTypes.BOOLEAN, allowNull: false },
  order: { type: DataTypes.INTEGER, allowNull: false },
});


const User_Tasks = sequelize.define('user_task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  task_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  active: { type: DataTypes.BOOLEAN, allowNull: false },
  board_id: { type: DataTypes.INTEGER, allowNull: false },
});


const User_Boards = sequelize.define('user_board', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  board_id: { type: DataTypes.INTEGER, allowNull: false },
  owner: { type: DataTypes.BOOLEAN, allowNull: false },
});


const RefreshToken = sequelize.define('refreshToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
});


const Transaction = sequelize.define('transaction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  task_id: { type: DataTypes.INTEGER, allowNull: false },
  column: { type: DataTypes.STRING, allowNull: false },
  name_user: { type: DataTypes.STRING, allowNull: false },
  board_id: { type: DataTypes.INTEGER, allowNull: false },
  transaction: { type: DataTypes.STRING, allowNull: false },
});

const Invite = sequelize.define('invite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  board_id: { type: DataTypes.INTEGER, allowNull: false },
  key: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(User_Boards);
User.belongsToMany(Task, {through: User_Tasks});

Board.hasMany(User_Boards);
Board.hasMany(Task);

Task.belongsTo(Board);
Task.belongsToMany(User, {through: User_Tasks});

User_Boards.belongsTo(User);
User_Boards.belongsTo(Board);

User_Tasks.belongsTo(User);
User_Tasks.belongsTo(Task);

Invite.hasOne(Board);

RefreshToken.belongsTo(User, {as: 'user_id'});

Transaction.belongsToMany(User, {through: User_Tasks});
Transaction.belongsTo(Board);

module.exports = {
  User,
  Board,
  Task,
  User_Boards,
  User_Tasks,
  Invite,
  RefreshToken,
  Transaction,
};
