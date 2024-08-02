const express = require("express")
const dotenv = require("dotenv")
const connectToDatabase = require("./db/db")
const cloudinary = require("cloudinary").v2;
const acceptMultimedia = require("connect-multiparty")

const app = express();
app.use(express.json());
dotenv.config();

connectToDatabase();

//Cloudinary Config for Images
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//For Uploading Files 
app.use(acceptMultimedia());

app.use('/api/user', require("./routes/userRoutes"))
app.use('/api/product', require("./routes/productroutes"))

app.get('/', (req, res) => {
    res.send("Hello from the server")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})