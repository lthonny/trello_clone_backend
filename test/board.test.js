const { expect } = require('chai');
const boardService = require('../app/services/board/boardService');

describe('Board service', function() {
  let boardId = null;
  beforeEach(async function() {});
  afterEach(async function() {});

  it('should create board', async function() {
    const name = 'new board';
    const board = await boardService.create(1, name);
    boardId = board.id;
    expect(board.title).to.equal(name);
  });

  it('should get board', async function() {
    const board = await boardService.getBoard(boardId);
    expect(board.id).to.equal(boardId);
  });

  it('should update title board', async function() {
    const title = 'board title new';
    const board = await boardService.update(boardId, title, 1);
    expect(board.title).to.equal(title);
  });

  it('should delete board', async function() {
    const board = await boardService.delete(boardId);
    expect(board).to.equal('board removed');
  });

  it('should get board tasks', async function() {
    const board = await boardService.fetchOne(boardId);
    expect(board.error).to.equal('в таблице нет задач');
  });
});