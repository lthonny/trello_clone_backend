const authorize = require("../middlewares/authorize");
const archiveController = require("../controllers/archiveController");
const Router = require("express");
const router = new Router();

router.get(`/:id`, authorize, archiveController.archives);
router.post(`/:id`, authorize, archiveController.create);

module.exports = router;