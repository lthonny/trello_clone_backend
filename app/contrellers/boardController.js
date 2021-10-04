class BoardController {
  async boards(req, res) {
    return req.json('all boards');
  }

  async board(req, res) {
    return req.json('borad');
  }
}

module.exports = new BoardController();
