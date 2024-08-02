const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    image: {
        type: String,
        required: false
    }
}, { timestampe: true })

const User = mongoose.model("User", userSchema);
module.exports = User;