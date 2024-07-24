const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")

mongoose
  .connect(config.MONGO_URL)
  .then(() => logger.info("Monogodb connected"))
  .catch((error) => logger.error("Error connecting to Monogdb: ", error))

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())

app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app