import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const NewBlogForm = ({ createBlog }) => {
  const navigate = useNavigate()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    navigate('/')
  }

  return(
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="Title"

            value={blogTitle}
            onChange={event => setBlogTitle(event.target.value)}
          />
          <p></p>
          <TextField
            label="Author"
            value={blogAuthor} onChange={event => setBlogAuthor(event.target.value)}
          />
          <p>
          </p>
          <TextField
            label = "URL"
            value={blogUrl}
            onChange={event => setBlogUrl(event.target.value)}
          />

          <p><Button type="submit" variant='contained'>Create</Button></p>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm