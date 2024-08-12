const User = require("../models/userModel");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../middleware/sendMail");
const bcrypt = require("bcrypt")


// Email validation function using regex
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to generate random password
const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
}

const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 12;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

    if (password.length < minLength || password.length > maxLength) {
        return `Password should be between ${minLength} to ${maxLength} characters long.`;
    }

    if (!passwordRegex.test(password)) {
        return 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    return null;
};


const register = async (req, res) => {
    const { firstName, lastName, email, password, image } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(400).send('Please enter all required fields');
    }
    if (!validateEmail(email)) {
        return res.status(400).send('Please enter a valid email address');
    }
    const passwordError = validatePassword(password || generateRandomPassword());
    if (passwordError) {
        return res.status(400).send(passwordError);
    }

    try {
        let imageUrl = '';
        if (image && typeof image === 'string' && image.startsWith('http')) {
            imageUrl = image;
        } else if (req.files && req.files.image) {
            const uploadedImage = await cloudinary.uploader.upload(req.files.image.path, {
                folder: "user",
                crop: "scale"
            });
            imageUrl = uploadedImage.secure_url;
        }

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).send("User Already Exists");
        }

        const randomPassword = password || generateRandomPassword();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(randomPassword, salt);

        const userData = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: imageUrl
        });
        await userData.save();

        // Create verification token (optional, based on your requirements)
        const token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send verification email with the random password
        const emailOptions = {
            to: userData.email,
            subject: 'Account Verification & Password',
            html: `
                <h2>Hello ${firstName},</h2>
                <p>Your account has been created successfully. Here is your temporary password: <strong>${randomPassword}</strong></p>
                <p>Please use this password to log in and update it after logging in.</p>
            `
        };
        await sendEmail(emailOptions);

        return res.status(200).json({
            success: true,
            message: "Registered Successfully. Please check your email for verification and password."
        });

    } catch (error) {
        console.error(`Error while Registering: ${error}`);
        res.status(500).send("Internal Server Error");
    }
};

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     console.log(req.body)
//     if (!email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Please Enter all fields"
//         });
//     }
//     try {
//         const userData = await User.findOne({ email: email })
//         if (!userData) {
//             return res.status(400).send("User Not Found")
//         }
//         const checkPassword = await userData.password
//         const isMatched = await bcrypt.compare(password, checkPassword);
//         if (!isMatched) {
//             return res.status(400).send("Incorrect Password")
//         }
//         const payload = {
//             id: userData.id,
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             email: userData.email,
//             cartItems: userData.cartItems,
//             image: userData.image,
//             isAdmin: userData.isAdmin
//         }
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6hr" })
//         return res.status(200).json({
//             success: true,
//             token: token,
//             userData,
//             message: "Login Successfully"
//         });

//     } catch (error) {
//         console.log(`Error while Login ${error}`)
//         res.status(400).send("Internal Server Error")
//     }
// }

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields"
        });
    }

    try {
        const userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        if (userData.isLocked()) {
            return res.status(403).json({
                success: false,
                message: "Account is locked due to too many failed login attempts. Please try again later."
            });
        }

        const isMatched = await bcrypt.compare(password, userData.password);
        if (!isMatched) {
            userData.failedLoginAttempts += 1;

            if (userData.failedLoginAttempts >= 5) {  
                userData.lockUntil = Date.now() + (1 * 60 * 1000);  // Lock the account for 1 minutes
                userData.failedLoginAttempts = 0; 
            }

            await userData.save();

            return res.status(400).json({
                success: false,
                message: "Incorrect password. If you fail to login multiple times, your account will be locked."
            });
        }

        // Reset failed login attempts and lockUntil if login is successful
        userData.failedLoginAttempts = 0;
        userData.lockUntil = null;
        await userData.save();

        const payload = {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            image: userData.image,
            isAdmin: userData.isAdmin
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6hr" });

        return res.status(200).json({
            success: true,
            token: token,
            userData,
            message: "Login successfully"
        });

    } catch (error) {
        console.error(`Error while Login ${error}`);
        return res.status(500).send("Internal Server Error");
    }
};


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

const allUser = async (req, res) => {
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