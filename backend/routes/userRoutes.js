const router = require("express").Router()
const userController = require("../controller/userController")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", userController.getProfile);
router.get("/allusers", userController.allUser);

module.exports = router