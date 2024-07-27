const { test, describe } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
]
const oneBlog = [blogs[0]]

test("dummy returns one", () => {
  assert.equal(listHelper.dummy([]), 1)
})

describe("total likes", () => {
  test("empty list returns 0", () => {
    assert.equal(listHelper.totalLikes([]), 0)
  })

  test("one blog returns the blog's likes", () => {
    assert.equal(listHelper.totalLikes(oneBlog), oneBlog[0].likes)
  })

  test("likes are added up correctly", () => {
    assert.equal(listHelper.totalLikes(blogs), 36)
  })
})

describe("favorite blog", () => {
  test("empty list returns null", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), null)
  })

  test("one blog returns the blog", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(oneBlog), oneBlog[0])
  })

  test("finds the right one among many", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })
})

describe("mostBlogs", () => {
  test("empty list returns null", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), null)
  })

  test("one blog returns the blog", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(oneBlog), { author: oneBlog[0].author, blogs: 1 })
  })

  test("finds the right one among many", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: "Robert C. Martin", blogs: 3 })
  })
})

describe("mostLikedAuthor", () => {
  test("empty list returns null", () => {
    assert.deepStrictEqual(listHelper.mostLikedAuthor([]), null)
  })

  test("one blog returns the blog", () => {
    assert.deepStrictEqual(listHelper.mostLikedAuthor(oneBlog), { author: oneBlog[0].author, likes: oneBlog[0].likes })
  })

  test("finds the right one among many", () => {
    assert.deepStrictEqual(listHelper.mostLikedAuthor(blogs), { author: "Edsger W. Dijkstra", likes: 17 })
  })
})
