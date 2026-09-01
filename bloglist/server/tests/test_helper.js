const User = require('../models/user')
const Blog = require('../models/blog')
const {listWithManyBlogs} = require('../tests/test_list')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  


module.exports = {
  listWithManyBlogs,
  blogsInDb,
  usersInDb,
}