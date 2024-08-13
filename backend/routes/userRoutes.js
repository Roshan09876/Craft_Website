const router = require("express").Router()
const userController = require("../controller/userController")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", userController.getProfile);
router.put("/update/:id", userController.updateProfile);
router.get("/allusers", userController.allUser);
router.get("/logactivities", userController.getLoginActivities);
router.delete("/logactivity/:id", userController.deleteLoginActivity);

module.exports = router