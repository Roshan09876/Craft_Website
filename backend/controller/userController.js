const User = require("../models/userModel");
const cloudinary = require("cloudinary")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    const { firstName, lastName, email, password, image } = req.body;
    console.log(req.body);

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send('Please enter all required fields');
    }

    try {
        let imageUrl = '';

        // Handle image processing if provided
        if (image && typeof image === 'string' && image.startsWith('http')) {
            imageUrl = image; // Use provided image URL
        } else if (req.files && req.files.image) {
            // Handle image upload if a file is provided
            const uploadedImage = await cloudinary.uploader.upload(req.files.image.path, {
                folder: "user",
                crop: "scale"
            });
            imageUrl = uploadedImage.secure_url;
        }

        // Check if user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).send("User Already Exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const userData = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: imageUrl
        });
        await userData.save();

        return res.status(200).json({
            success: true,
            userData,
            message: "Registered Successfully"
        });

    } catch (error) {
        console.error(`Error while Registering: ${error}`);
        res.status(500).send("Internal Server Error"); 
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please Enter all fields"
        });
    }
    try {
        const userData = await User.findOne({ email: email })
        if (!userData) {
            return res.status(400).send("User Not Found")
        }
        const checkPassword = await userData.password
        const isMatched = await bcrypt.compare(password, checkPassword);
        if (!isMatched) {
            return res.status(400).send("Incorrect Password")
        }
        const payload = {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            cartItems: userData.cartItems,
            image: userData.image,
            isAdmin: userData.isAdmin
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6hr" })
        return res.status(200).json({
            success: true,
            token: token,
            userData,
            message: "Login Successfully"
        });
        // if (!userData.cartItems || userData.cartItems.length === 0) {
        //     return res.status(200).json({
        //         success: false,
        //         token: token,
        //         userData,
        //         message: "Please select a course"
        //     });
        // }

    } catch (error) {
        console.log(`Error while Login ${error}`)
        res.status(400).send("Internal Server Error")
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).send("User Not Found")
        }
        return res.status(200).json({
            success: true,
            user,
            message: "Profile Fetched Successfully"
        })
    } catch (error) {
        console.log(`Error in Get Profile ${error}`)
        return res.status(500).send("Internal Server Error")
    }
}

const allUser = async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            success: true,
            users,
            message: "ALl User Fetched Successfully"
        })
    } catch (error) {
        console.log(`Error in all Users  ${error}`)
        return res.status(500).send("Internal Server Error")
        
    }
}

module.exports = {
    register,
    login,
    getProfile,
    allUser
}