const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const config = require("../utils/config")

usersRouter.get("/", async (request, response) => {
  const allUsers = await User.find({}).populate("blogs", "url title author")

  response.status(200).json(allUsers)
})

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body

  if (!username || !name | !password)
    return response.status(400).json("username, name, and password must be provided")

  if (password.length < 8)
    return response.status(400).json({ error: "the password must be at least 8 characters" })

  const passwordHash = await bcrypt.hash(password, 10)
  try {
    const result = await User.create({ name, username, passwordHash })
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

if (config.ENVIRONMENT !== "production") {
  usersRouter.delete("/", async (request, response) => {
    const result = await User.deleteMany({})
    response.status(200).json(result)
  })
}

module.exports = usersRouter
