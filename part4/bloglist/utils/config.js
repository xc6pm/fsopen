require("dotenv").config()

const ENVIRONMENT = process.env.NODE_ENV
const MONGO_URL = ENVIRONMENT === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI
const PORT = process.env.PORT
const SECRET = process.env.SECRET

module.exports = {
    ENVIRONMENT,
    MONGO_URL,
    PORT,
    SECRET,
}