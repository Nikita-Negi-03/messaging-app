const messagesControllers=require("../controllers/messagesController");

const router = require("express").Router();

router.post("/addmsg",messagesControllers.addMessages);
router.post("/getmsg",messagesControllers.getAllMessages);

module.exports = router;