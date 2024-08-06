const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true, unique: true },
    likes: { type: Number, default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
