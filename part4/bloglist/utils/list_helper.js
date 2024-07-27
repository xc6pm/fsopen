const groupBy = require("lodash/groupBy")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs && blogs.length ? blogs.reduce((t, b) => (t += b.likes), 0) : 0
}

const favoriteBlog = (blogs) => {
  return blogs && blogs.length
    ? blogs.reduce((f, b) => {
        if (b.likes > f.likes) f = b
        return f
      }, blogs[0])
    : null
}

const mostBlogs = (blogs) => {
  if (!blogs?.length) return null

  const groups = groupBy(blogs, (b) => b.author)

  let maxItem = { author: "", blogs: 0 }
  for (const [author, works] of Object.entries(groups)) {
    if (works.length > maxItem.blogs) {
      maxItem = { author: author, blogs: works.length }
    }
  }

  return maxItem
}

const mostLikedAuthor = (blogs) => {
  if (!blogs?.length) return null

  let mostLiked = { author: "", likes: 0 }
  blogs.reduce((res, b) => {
    if (res[b.author]) {
      res[b.author] += b.likes
    } else {
      res[b.author] = b.likes
    }
    if (res[b.author] > mostLiked.likes) {
      mostLiked = {
        author: b.author,
        likes: res[b.author],
      }
    }
    return res
  }, {})

  return mostLiked
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikedAuthor }
