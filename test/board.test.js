const { expect } = require('chai');
const boardService = require('../app/services/board/boardService');
const userService = require('../app/services/auth/userServices');

describe('Board service', function() {
  let userId = null;
  let boardId = null;
  let refreshToken = null;
  let inviteKey = null;

  let regUser = {
    name: 'test',
    email: '99test@mail.ru',
    password: 'killmenot',
    auth_via: null,
  };

  beforeEach(async function() {
  });
  afterEach(async function() {
  });

  it('should sign up user', async function() {
    const { name, email, password, auth_via } = regUser;
    const sign_up = await userService.sign_up(name, email, password, auth_via);
    userId = sign_up.user.id;
    refreshToken = sign_up.refreshToken;
    expect(sign_up.user.name).to.equal(name);
  });

  it('should create board', async function() {
    const name = 'new board';
    const board = await boardService.create(userId, name);
    boardId = board.id;
    expect(board.title).to.equal(name);
  });

  it('should get all boards', async function() {
    const boards = await boardService.fetchAll(userId);
    expect(boards.length).to.equal(1);
  });

  it('should update title board', async function() {
    const title = 'board title new';
    const board = await boardService.update(boardId, title, userId);
    expect(board.title).to.equal(title);
  });

  it('should get board tasks', async function() {
    const boardTasks = await boardService.fetchOne(boardId, userId);
    expect(boardTasks.tasks.length).to.equal(0);
  });

  it('should get key', async function() {
    const key = await boardService.getInviteLink(boardId);
    inviteKey = key;
    expect(typeof key).to.equal('string');
  });

  it('should get get invite board', async function() {
    const board = await boardService.getInviteBoard(userId, inviteKey);
    expect(board.key.key).to.equal(inviteKey);
  });

  it('should get archive tasks', async function() {
    const tasks = await boardService.getArchive(boardId);
    expect(tasks.length).to.equal(0);
  });

  it('should authorize access', async function() {
    const access = await boardService.authorizeAccess(userId, boardId);
    expect(access.owner).to.equal(true);
  });

  it('should delete board', async function() {
    const board = await boardService.delete(boardId, userId);
    expect(board).to.equal(true);
  });

  it('should logout user', async function() {
    const token = await userService.logout(refreshToken);
    expect(token).to.equal(1);
  });
});