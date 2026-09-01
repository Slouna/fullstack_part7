const blogsRouter = require('express').Router()
const { response, request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
  
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  if(!body.title){
    return response.status(400).json({
      error: 'Title is missing'
    })
  }

  if(!body.url){
    return response.status(400).json({
      error: 'Url is missing'
    })
  }

  
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id 
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', {
    username: 1,
    name: 1
  })
  response.status(201).json(savedBlog)
  
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else{
    return response.status(400).json({ error: 'cannot remove blogs you have not made' }).end()
  }
  
})

blogsRouter.put('/:id', async(request, response) =>{
  const updatedBlog = request.body
  const oldBlog = await Blog.findById(request.params.id)

  if (!oldBlog){
    console.log('could not find the blog')
    return response.status(404).end()
  }

  oldBlog.title = updatedBlog.title
  oldBlog.author = updatedBlog.author
  oldBlog.url = updatedBlog.url
  oldBlog.likes = updatedBlog.likes

  await oldBlog.save()
  response.json(oldBlog)
})

module.exports = blogsRouter