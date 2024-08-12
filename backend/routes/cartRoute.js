const router = require("express").Router()
const cartController = require("../controller/cartController")

router.post("/add/:userId/:productId", cartController.addToCart)

module.exports = router