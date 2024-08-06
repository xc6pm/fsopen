const { response } = require("express")
const logger = require("./logger")

const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method)
  logger.info("Path: ", request.path)
  logger.info("Body: ", request.body)
  logger.info("----")
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorizationHeader = request.get("authorization")
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    request.token = authorizationHeader.replace("Bearer ", "")
  }

  next()
}

const unknownEndpoint = (request, reponse) => {
  return response.status(404).send({ error: "Endpoint unreachable" })
}

const errorHandler = (error, request, response, next) => {
  logger.error("From error logger middleware: ", error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response.status(400).json({ error: "expected `username` to be unique" })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
}
