import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useBlogActions, useBlogs } from "../store";
import { useNotificationActions } from "../store";
import { useCurrentUser } from "../store";

const Blog = () => {
  const navigate = useNavigate();
  const { deleteBlog, like } = useBlogActions();
  const { setNotification, setSuccessStatus } = useNotificationActions();
  const blogs = useBlogs();
  const { id } = useParams();
  const user = useCurrentUser();
  let userId;
  if (user) {
    userId = user.id;
  }

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return <p>Loading...</p>;
  }

  const handleLike = async (blog) => {
    await like(blog.id);
    setNotification(`Blog '${blog.title}' liked`);
    setSuccessStatus(true);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Do you want to remove the blog: ${blog.title} `)) {
      const response = await deleteBlog(blog.id);
      console.log(response);
      if (response === 400) {
        setSuccessStatus(false);
        setNotification("You cannot remove blogs that other users have added");
      } else if (response === 401) {
        setSuccessStatus(false);
        setNotification("Invalid token");
      } else if (response === 204) {
        setSuccessStatus(true);
        setNotification(`${blog.title} deleted!`);
      } else {
        setSuccessStatus(false);
        setNotification("Uncaught error");
      }
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
    navigate("/");
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

export default Blog;
