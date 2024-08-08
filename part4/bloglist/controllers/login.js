const loginRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")


loginRouter.post("/", async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    const isPasswordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false

    if (!(user && isPasswordCorrect)) {
        return response.status(401).json({error: "username or password incorrect"})
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, config.SECRET)

    response.status(200).json({token, username: user.username, name: user.name, id: user.id})
})


module.exports = loginRouter