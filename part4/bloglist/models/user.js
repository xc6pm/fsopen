const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: { type: String, required: true, minLength: 8 },
},{
    toJSON: (doc, ret) => {
        ret.id = doc._id,
        delete ret._id
        delete ret.__v
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User
