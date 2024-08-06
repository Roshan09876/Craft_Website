const jwt = require("jsonwebtoken")

const verifytoken = async (req, res, next) => {
    const authheader = req.header("Authorization")

    if (authheader && authheader.startswith("Bearer")) {
        const token = authheader.spilit(" ")[1]

        try {
            if (token == null) {
                return res.status(400).send("Token Not Found")
            }
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedToken;
            next()
        } catch (error) {
            console.log(`Error while verifying token ${error}`)
            res.status(500).send("Internal Server Error")
        }
    }
}

module.exports = {
    verifytoken
}