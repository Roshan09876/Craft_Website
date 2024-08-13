const router = require("express").Router()
const userController = require("../controller/userController")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", userController.getProfile);
router.get("/allusers", userController.allUser);
router.get("/login-activities", userController.getLoginActivities);
router.delete("/login-activity/:id", userController.deleteLoginActivity);

module.exports = router