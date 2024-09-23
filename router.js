const { Router, Response } = require("pepesan");
const BotController = require("./controller/BotController");

const f = require("./utils/Formatter");

const router = new Router();

router.menu(f("menu.recordOrder"), [BotController, "recordOrder"]);
router.menu(f("menu.checkStock"), [BotController, "checkStock"]);
router.state("inputIn", [BotController, "handleInput"]);
router.keyword("*", [BotController, "introduction"]);

module.exports = router;