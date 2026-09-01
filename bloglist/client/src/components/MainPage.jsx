import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from './Notification'
import NewBlogForm from './NewBlogForm'
import LoginForm from './LoginForm'
import BlogList from './BlogList'
import { AppBar, Container, Toolbar, Button, colors } from '@mui/material'

const MainPage = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)
  const addBlogRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const updateBlog = async (blogObject) => {
    await blogService.update(blogObject.id, blogObject)
    const response = await blogService.getAll()
    setBlogs(response)

  }

  const removeBlog = async (blog) => {
    if(window.confirm(`Do you want to remove the blog: ${blog.title} `)){
      const response = await blogService.deleteBlog(blog.id)
      console.log(response)
      if (response === 0){
        console.log('what')
      }
      if(response === 400){
        setSuccess(false)
        setMessage('You cannot remove blogs that other users have added')
      } else if(response === 401) {
        setSuccess(false)
        setMessage('Invalid token')
      }else {
        setSuccess(true)
        setMessage(`${blog.title} deleted!`)
      }
      setTimeout(() => {setMessage(null)}, 5000)
    }
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)

  }


  return(
    <div className='app'>
      <div>
        <h2>blogs</h2>
        {user && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <BlogList key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} userId={user.id} />
        )}
        {!user && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <BlogList key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}  />
        )}

      </div>
    </div>
  )
}


export default MainPage