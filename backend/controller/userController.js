const User = require("../models/userModel");
const cloudinary = require("cloudinary")

const register = async (req, res) => {
    const { firstName, lastName, email, password, image } = req.body;
    console.log(req.body)
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send('Please enter all fields')
    }
    try {

        if (typeof image === 'string' && image.startsWith('http')) {
            imageUrl = image;
        } else if (req.files && req.files.image) {
            const uploadedImage = await cloudinary.uploader.upload(req.files.image.path, {
                folder: "course",
                crop: "scale"
            });
            imageUrl = uploadedImage.secure_url;
        }


        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).send("User Already Exists")
        }
        const userData = await User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            image: imageUrl || ''
        })
        await userData.save();
        return res.status(200).json({
            success: true,
            userData,
            message: "Registered Successfully"
        })

    } catch (error) {
        console.log(`Error while Registering ${error}`)
        res.status(400).send("Internal Server Error")
    }
}

module.exports = {
    register
}