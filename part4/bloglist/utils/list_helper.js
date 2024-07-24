const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs && blogs.length ? blogs.reduce((t, b) => (t += b.likes), 0) : 0
}

const favoriteBlog = (blogs) => {
  return blogs && blogs.length ? blogs.reduce((f, b) => {
    if (b.likes > f.likes)
        f = b
    return f
  }, blogs[0]) : null
}

module.exports = { dummy, totalLikes, favoriteBlog }
