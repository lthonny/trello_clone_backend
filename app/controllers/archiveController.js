const archiveService = require('../services/archive/archiveService');

class ArchiveController {
  async archives(req, res) {
    try {
      const archives = await archiveService.getArchive(req.params.id);
      return res.status(200).json(archives);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { archive, board_id } = req.body;
      const access = await archiveService.authorizeAccess(Number(req.decoded.id), board_id);

      if (!access) {
        res.sendStatus(403);
      }

      const data = await archiveService.setArchive(req.params.id, archive, access);
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new ArchiveController();