const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const config = require("../utils/config")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("creator", "username name")
  response.json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
  if (!request.userId) {
    return response.status(401).send("unauthorized")
  }

  const creator = await User.findById(decodedToken.id)
  const blog = new Blog(request.body)

  blog.creator = creator.id

  try {
    const createdBlog = await blog.save()

    creator.blogs = creator.blogs.concat(createdBlog.id)

    await creator.save()

    response.status(201).json(createdBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.patch("/:id", async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      runValidators: true,
      returnDocument: "after",
    })
    console.log("result of patch", result)
    response.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  if (!request.userId) {
    return response.status(401).send("unauthorized")
  }

  try {
    const blogToDelete = await Blog.findById(request.params.id)
    if (blogToDelete.creator.toString() !== request.userId) {
      return response.status(401).send("the blog is not yours to delete")
    }

    await blogToDelete.deleteOne()
    response.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

if (config.ENVIRONMENT !== "production") {
  blogsRouter.delete("/", async (request, response) => {
    const result = await Blog.deleteMany({})
    response.status(200).json(result)
  })
}

module.exports = blogsRouter
