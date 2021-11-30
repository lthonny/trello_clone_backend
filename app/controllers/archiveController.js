const archiveService = require('../services/archive/archiveService');
const accessService = require('../services/accessService');

class ArchiveController {
  async archives(req, res, next) {
    try {
      const archives = await archiveService.getArchive(req.params.id);

      if(!archives) {
        return res.sendStatus(204);
      }

      return res.status(200).json(archives);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const access = await accessService(req.decoded.id);

      if (!access) {
        return res.sendStatus(204);
      }

      const data = await archiveService.setArchive(req.params.id, req.body.archive);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArchiveController();