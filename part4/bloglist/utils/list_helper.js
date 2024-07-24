const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs && blogs.length > 0 ? blogs.reduce((t, b) => (t += b.likes), 0) : 0
}

module.exports = { dummy, totalLikes }
