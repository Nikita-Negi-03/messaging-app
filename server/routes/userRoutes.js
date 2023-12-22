const userControllers=require("../controllers/usersController");

const router = require("express").Router();

router.post("/register",userControllers.register);
router.post("/login",userControllers.login);
router.post("/setAvatar/:id",userControllers.setAvatar);
router.get("/allUsers/:id",userControllers.getAllUsers);

module.exports = router;