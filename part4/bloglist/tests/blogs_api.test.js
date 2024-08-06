const supertest = require("supertest")
const { test, after, beforeEach, describe } = require("node:test")
const mongoose = require("mongoose")
const app = require("../app")
const Blog = require("../models/blog")
const assert = require("node:assert")
const User = require("../models/user")

const api = supertest(app)

const initialUsers = [
  {
    username: "hsn",
    name: "hssein",
    password: "21341431",
  },
  {
    username: "aram",
    name: "alireza ameli",
    password: "vniodr44",
  },
]

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
  await User.deleteMany({})

  let result = await api.post("/api/users").send(initialUsers[0])
  result = await api.post("/api/users").send(initialUsers[1])

  await Blog.deleteMany({})

  const res = await api.post("/api/login").send(initialUsers[0])
  initialUsers[0].token = res.body.token
  for (let i = 0; i < initialBlogs.length / 2; i++) {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${initialUsers[0].token}`)
      .send(initialBlogs[i])
  }

  initialUsers[1].token = (await api.post("/api/login").send(initialUsers[1])).body.token
  for (let i = initialBlogs.length / 2; i < initialBlogs.length; i++) {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${initialUsers[1].token}`)
      .send(initialBlogs[i])
  }

  const users = await User.find({})
  const blogs = await Blog.find({})
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
    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${initialUsers[0].token}`)
      .send(newBlog)
      .expect(201)

    const updatedBlogs = await api.get("/api/blogs")

    assert.strictEqual(updatedBlogs.body.length, initialBlogs.length + 1)

    const lastBlog = updatedBlogs.body[updatedBlogs.body.length - 1]
    assert.strictEqual(lastBlog.title, newBlog.title)
    assert.strictEqual(lastBlog.author, newBlog.author)
    assert.strictEqual(lastBlog.url, newBlog.url)
    assert.strictEqual(lastBlog.likes, newBlog.likes)
    assert.strictEqual(lastBlog.creator.username, initialUsers[0].username)
  })

  test("likes defaults to zero", async () => {
    delete newBlog.likes

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${initialUsers[0].token}`)
      .send(newBlog)
      .expect(201)

    const updatedBlogs = await api.get("/api/blogs")

    assert.strictEqual(updatedBlogs.body.length, initialBlogs.length + 1)

    assert.ok("likes" in updatedBlogs.body[updatedBlogs.body.length - 1])
    assert.equal(updatedBlogs.body[updatedBlogs.body.length - 1].likes, 0)
  })

  test("unprovided title errors", async () => {
    delete newBlog.title

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${initialUsers[0].token}`)
      .send(newBlog)
      .expect(400)
      .expect((res) => res.body.error.includes("`title` is required"))
  })

  test("unprovided url errors", async () => {
    delete newBlog.url

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${initialUsers[0].token}`)
      .send(newBlog)
      .expect(400)
      .expect((res) => res.body.error.includes("`url` is required"))
  })
})

describe("delete blog", () => {
  test("valid id deletes", async () => {
    const indexToDelete = 4
    const beforeDelete = await api.get("/api/blogs")
    const idToDelete = beforeDelete.body[indexToDelete].id
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set("Authorization", `Bearer ${initialUsers[1].token}`)
      .expect(204)

    const updated = await api.get("/api/blogs")
    assert.strictEqual(updated.body.length, initialBlogs.length - 1)
    assert.notStrictEqual(updated.body[indexToDelete].id, idToDelete)
  })

  test("invalid id errors", async () => {
    await api
      .delete("/api/blogs/1")
      .set("Authorization", `Bearer ${initialUsers[0].token}`)
      .expect(400)
      .expect((res) => res.body.error === "malformatted id")

    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, initialBlogs.length)
  })
})

describe("patch blog", () => {
  test("patch likes updates only likes", async () => {
    const indexToUpdate = 1
    const response = await api.get("/api/blogs")
    const idToUpdate = response.body[indexToUpdate].id
    const newVal = 200

    await api.patch(`/api/blogs/${idToUpdate}`).send({ likes: newVal }).expect(200)

    const updated = await api.get("/api/blogs")

    assert.strictEqual(updated.body[indexToUpdate].likes, newVal)
  })

  test("invalid value won't be applied", async () => {
    const indexToUpdate = 1
    const response = await api.get("/api/blogs")
    const idToUpdate = response.body[indexToUpdate].id
    const newVal = "fa"

    await api.patch(`/api/blogs/${idToUpdate}`).send({ likes: newVal }).expect(400)

    const updated = await api.get("/api/blogs")

    assert.notStrictEqual(updated.body[indexToUpdate].likes, newVal)
  })
})

after(async () => {
  await mongoose.connection.close()
})
