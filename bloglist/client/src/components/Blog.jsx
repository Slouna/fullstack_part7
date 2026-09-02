
import RegularButton from "./RegularButton";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useBlogActions, useBlogs } from "../store";
import { useNotificationActions } from "../store";


const Blog = ({ userId }) => {
  const navigate = useNavigate();
  const { deleteBlog, like } = useBlogActions()
  const { setNotification, setSuccessStatus } = useNotificationActions()
  const blogs = useBlogs()
  const {id} = useParams()

  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return <p>Loading...</p>
  }


  const handleLike = async (blog) => {
    await like(blog.id)
  };

  //virheiden käsittely
  const handleRemove = async (blog) => {
    if (window.confirm(`Do you want to remove the blog: ${blog.title} `)) {
      await deleteBlog(blog.id)
      await setSuccessStatus(true);
      await setNotification(`${blog.title} deleted!`)
      
      
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      navigate("/");
    }
    
  };

  return (
    <div className="blogCard">
      <p style={{ fontSize: 30 }}>{blog.title}</p>
      <p> by {blog.author}</p>
      <p></p>
      <a href="{blog.url}">{blog.url}</a>
      <p>{blog.user.name}</p>

      <div style={{ display: "flex", marginTop: 20 }}>
        <p>Likes: {blog.likes}</p>
        <div>
          {userId && (
            <Button
              variant="contained"
              style={{ marginLeft: 5, marginRight: 5 }}
              onClick={() => handleLike(blog)}
            >
              {" "}
              Like{" "}
            </Button>
          )}
        </div>
        {blog.user.id === userId && (
          <div>
            {
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#e53935",
                  marginLeft: 5,
                  marginRight: 5,
                }}
                onClick={() => handleRemove(blog)}
                className="remove"
              >
                Remove
              </Button>
            }
          </div>
        )}
      </div>
    </div>
  );
};

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

export default Blog;
