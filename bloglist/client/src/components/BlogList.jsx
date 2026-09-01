import { Link } from 'react-router-dom'

const BlogList = ({ blog }) => {

  return(
    <div>
      <li key= {blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </li>
    </div>
  )
}

export default BlogList