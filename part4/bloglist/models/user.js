const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minLength: 3 },
    name: String,
    passwordHash: { type: String, required: true, minLength: 8 },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

const User = mongoose.model("User", userSchema)

module.exports = User
