const archiveService = require("../services/archiveService");

class ArchiveController {
    async fetchArchive(req, res, next) {
        try {
            const archives = await archiveService.getArchive(req.params.id);
            return res.status(200).json(archives);
        } catch (e) {
            next(e);
        }
    }

    async createArchive(req, res, next) {
        try {
            const archive = await archiveService.setArchive(req.body);
            return res.status(200).json(archive);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ArchiveController();