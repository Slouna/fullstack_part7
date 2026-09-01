import Togglable from './Togglable'
import RegularButton from './RegularButton'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'


/*
I noticed the hint to  not use togglable after I had done this,
I will fix it if needed later in the material
But I think it works now as it should
*/
const Blog = ({ blog, updateBlog, removeBlog, userId }) => {
  const navigate = useNavigate()

  console.log('Blog received:', blog)


  const handleLike = async (blog) => {
    //event.preventDefault()
    const updatedBlog = blog
    updatedBlog.likes += 1
    //blogService.update(blog.id, updatedBlog)
    updateBlog(updatedBlog)
  }

  const handleRemove = async (blog) => {
    await removeBlog(blog)
    navigate('/')
  }



  console.log(userId)
  return(
    <div className="blogCard">
      <p style={{ fontSize: 30 }}>{blog.title}</p>
      <p> by {blog.author}</p>
      <p></p>
      <a href='{blog.url}'>{blog.url}</a>
      <p>{blog.user.name}</p>



      <div style={{ display: 'flex', marginTop:20 }}>
        <p>
        Likes: {blog.likes}
        </p>
        <div>
          {userId && <Button variant="contained" style={{ marginLeft: 5, marginRight: 5 }} onClick={() => handleLike(blog)}> Like </Button>}
        </div>
        {blog.user.id === userId &&
          <div>{<Button variant="contained" style={{ backgroundColor: '#e53935', marginLeft: 5, marginRight: 5 }} onClick={() => handleRemove(blog)} className="remove">Remove</Button>}</div>
        }

      </div>
    </div>
  )
}

/*
    <div className="blogCard">
      <p>{blog.title} by {blog.author}</p>
      <Togglable buttonLabel="view" closeLabel="Hide">
        <p>{blog.url}</p>
        <p>
        Likes: {blog.likes}
          {<RegularButton name= "Like" onClick={() => handleLike(blog)}/>}
        </p>
        <p>{blog.content}</p>
        <p>{blog.user.name}</p>
        {blog.user.id === userId &&
        <p>{<RegularButton name="Remove" onClick={() => handleRemove(blog)} className="remove"/>}</p>
        }

      </Togglable>
    </div>
*/

export default Blog