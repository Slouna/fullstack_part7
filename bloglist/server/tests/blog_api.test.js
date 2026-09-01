const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const {listWithManyBlogs} = require('../tests/test_list')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

/* 
run tests only in this file with:
npm test -- tests/blog_api.test.js
*/



describe('Blog api tests', () =>{
  let token
beforeEach(async () => {
    await Blog.deleteMany({})
    for(const blog of listWithManyBlogs){
        await new Blog(blog).save()
    }

    await User.deleteMany({})


    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
    //console.log(helper.blogsInDb)

    const login = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'sekret'
      })

    token = login.body.token
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, listWithManyBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(e => e.title)
    assert.strictEqual(titles.includes('First class tests'), true)
  })

test("objects have id, not _id", async () => {
    const response = await api.get('/api/blogs')
    assert(response.body.every(blog => Object.hasOwn(blog, "id")))
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Palindromeja",
        author: "Simo Frangen",
        url: "https://www.keksittysivu.com/simo",
        likes: 2
      } 
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
      
    assert.strictEqual(response.body.length, listWithManyBlogs.length + 1)
      
    assert(titles.includes('Palindromeja'))
})

test('new blog without likes has likes value 0', async () => {
  const users = await helper.usersInDb()

    const newBlog = {
        title: "Palindromeja",
        author: "Simo Frangen",
        url: "https://www.keksittysivu.com/simo",
        userId: users[0].id
      } 
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body[response.body.length - 1]
    assert.strictEqual(addedBlog.likes, 0)
})

test('blog without title gives status 400', async () => {
    const newBlog = {
        author: "Simo Frangen",
        url: "https://www.keksittysivu.com/simo",
        likes: 2,
      } 
    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.error, "Title is missing")

})

test('blog without url gives status 400', async () => {
    const newBlog = {
        title: "Palindromeja",
        author: "Simo Frangen",
        likes: 2,
      } 
    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.error, "Url is missing")
})

test('a blog can be deleted by the user who added it', async () => {
    const blogsAtStart = (await api.get('/api/blogs')).body

    const newBlog = {
      title: 'voikko poistaa tän',
      author: 'Simo Frangen',
      url: 'https://example.com',
      likes: 2
    }

    const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  
    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  
    const blogsAtEnd = (await api.get('/api/blogs')).body
  
    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(response.body.id))
  
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

test ('likes can be updated', async () => {
    const blogsAtStart = (await api.get('/api/blogs')).body
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 100
    }
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect('Content-Type', /application\/json/)

    const response = (await api.get('/api/blogs')).body

    assert.strictEqual(response[0].likes, 100)
  })

  test ('cannot add new blog without token', async () => {
    const newBlog = {
      title: "Palindromeja",
      author: "Simo Frangen",
      url: "https://www.keksittysivu.com/simo",
      likes: 2
    } 
  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

    
  assert.strictEqual(response.body.length, listWithManyBlogs.length)
    
  })
})