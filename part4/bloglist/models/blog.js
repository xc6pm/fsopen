const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: {type: Number, default: 0},
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog