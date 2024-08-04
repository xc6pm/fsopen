const supertest = require("supertest")
const { test, after, beforeEach, describe } = require("node:test")
const mongoose = require("mongoose")
const app = require("../app")
const Blog = require("../models/blog")
const assert = require("node:assert")

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of initialBlogs) {
    await (await Blog.create(blog)).save()
  }
})

describe("get blogs", () => {
  test("initial notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect((c) => c.body.length === initialBlogs.length)
  })
  
  test("_id is renamed to id", async () => {
    const response = await api.get("/api/blogs")
    assert.ok("id" in response.body[0])
    assert.ok(!("_id" in response.body[0]))
  })
})


describe("post blogs", () => {
  const newBlog = {
    title: "There is no thread",
    author: "Stephen Cleary",
    url: "https://blog.stephencleary.com/2013/11/there-is-no-thread.html",
    likes: 261,
  }

  test("blog gets added", async () => {
    await api.post("/api/blogs").send(newBlog).expect(201)
  
    const updatedBlogs = await api.get("/api/blogs")
  
    assert.strictEqual(updatedBlogs.body.length, initialBlogs.length + 1)
  
    delete updatedBlogs.body[updatedBlogs.body.length - 1].id
    assert.deepStrictEqual(updatedBlogs.body[updatedBlogs.body.length - 1], newBlog)
  })
  
  test("likes defaults to zero", async () => {
    delete newBlog.likes

    await api.post("/api/blogs").send(newBlog).expect(201)

    const updatedBlogs = await api.get("/api/blogs")

    assert.strictEqual(updatedBlogs.body.length, initialBlogs.length + 1)

    assert.ok("likes" in updatedBlogs.body[updatedBlogs.body.length - 1])
    assert.equal(updatedBlogs.body[updatedBlogs.body.length - 1].likes, 0)
  })
})


after(async () => {
  await mongoose.connection.close()
})
