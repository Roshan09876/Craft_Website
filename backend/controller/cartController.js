const Product = require("../models/productModel")
const User = require("../models/userModel")

const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send("User Not Found")
        }
        if (!user.cartItems.includes(productId)) {
            user.cartItems.push(productId);
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Item Added to cart"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Item already added to cart'
            })
        }
    } catch (error) {
        console.log(`Error while adding items to cart is ${error}`)
        res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    addToCart
}