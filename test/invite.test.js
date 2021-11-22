const { expect } = require('chai');
const inviteService = require('../app/services/inviteService');

describe('Invite service', function() {
  let userId = 1;
  let boardId = 1;
  let key = null;
  beforeEach(async function() {});
  afterEach(async function() {});

  it('should create', async function() {
    const inviteKey = await inviteService.create(boardId);
    key = inviteKey.key;
    expect(typeof inviteKey.key).to.equal('string');
  });

  it('should invite', async function() {
    const invite = await inviteService.invite(key);
    expect(typeof invite.owner).to.equal('boolean');
  });

  it('should board invite get', async function() {
    const board = await inviteService.inviteBoard(userId, key);
    expect(board.userId).to.equal(userId);
  });

  it('should leave invite', async function() {
    const data = {
      data: {
        user_id: userId,
        board_id: boardId,
      },
    };

    const invite = await inviteService.leave(data);
    expect(invite).to.equal('user left the board');
  });

  it('should remove invite', async function() {
    const data = {
      data: {
        user: { id: userId },
        board_id: boardId,
      },
    };
    const invite = await inviteService.remove(data);
    expect(invite).to.equal('user removed from board');
  });
});