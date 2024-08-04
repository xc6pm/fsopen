require("dotenv").config()

const MONGO_URL = process.env.ENVIRONMENT === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI
const PORT = process.env.PORT

module.exports = {
    MONGO_URL,
    PORT
}