const Product = require("../models/productModel")
const cloudinary = require("cloudinary")

const createProduct = async (req, res) => {
    const { title, description, image } = req.body;
    console.log(req.body)
    if (!title || !description) {
        return res.status(400).send('Please enter all fields')
    }
    try {
        if (typeof image === "string" && image.startsWith("http")) {
            imageUrl = image;
        } else if (req.files && req.files.image) {
            const uploadedImage = await cloudinary.uploader.upload(req.files.image, {
                folder: "product",
                crop: "scale"
            })
            imageUrl = uploadedImage.secure_url
        }
        const productExist = await Product.findOne({ title: title })
        if (productExist) {
            return res.status(400).send("Product Already Exists")
        }
        const newProduct = new Product({
            title: title,
            description: description,
            image: imageUrl || ''
        })
        await newProduct.save();
        res.json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        })

    } catch (error) {
        console.log(`Error while Creating Product is ${error}`)
        res.status(400).send("Internal Server Error")
    }

}

module.exports = {
    createProduct
}