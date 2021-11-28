const authorize = require("../middlewares/authorize");
const archiveController = require("../controllers/archiveController");
const Router = require("express");
const router = new Router();

router.get(`/fetch/:id`, authorize, archiveController.fetchArchive);
router.post(`/create`, authorize, archiveController.createArchive);

module.exports = router;