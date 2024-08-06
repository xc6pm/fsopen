require("dotenv").config()

const MONGO_URL = process.env.NODE_ENV === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI
const PORT = process.env.PORT
const SECRET = process.env.SECRET

module.exports = {
    MONGO_URL,
    PORT,
    SECRET
}