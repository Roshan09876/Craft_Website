const router = require("express").Router()
const productController = require("../controller/productController")

router.post("/create", productController.createProduct);
router.get("/getallproduct", productController.getallProduct);

module.exports = router