import { useState, useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import { AppBar, Container, Toolbar, Button } from "@mui/material";
import MainPage from "./components/MainPage";
import ErrorBoundary from "./components/ErrorBoundary";
import SplatRoute from "./components/SplatRoute";
import { useNotificationActions } from "./store";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const {setNotification, setSuccessStatus} = useNotificationActions()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      console.log(returnedBlog);
      setBlogs(blogs.concat(returnedBlog));
      //addBlogRef.current.toggleVisibility()
      await setSuccessStatus(true)
      await setNotification(
        `A new blog: ${blogObject.title}, by ${blogObject.author} added to to blog list!`,
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setSuccessStatus(false);
      setNotification("Adding new blog failed");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    await blogService.update(blogObject.id, blogObject);
    const response = await blogService.getAll();
    setBlogs(response);
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Do you want to remove the blog: ${blog.title} `)) {
      const response = await blogService.deleteBlog(blog.id);
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

    const allBlogs = await blogService.getAll();

    setBlogs(allBlogs);
  };

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const hooverStyle = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

  return (
    <Container>
      <div>
        <div>
          <AppBar position="static">
            <Toolbar style={{ display: "flex" }}>
              BlogApp
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  marginLeft: "auto",
                  marginRight: 0,
                }}
              >
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={hooverStyle}
                >
                  Blogs
                </Button>
                {user && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/create"
                    sx={hooverStyle}
                  >
                    New Blog
                  </Button>
                )}
                {!user && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={hooverStyle}
                  >
                    Log In
                  </Button>
                )}
                {user && (
                  <Button
                    style={{}}
                    color="inherit"
                    onClick={handleLogOut}
                    sx={hooverStyle}
                  >
                    Log out
                  </Button>
                )}
              </div>
            </Toolbar>
          </AppBar>
          <ErrorBoundary>
            <Notification />
            <Routes>
              {
                // different params if user is not logged in
              }
              {user && (
                <Route
                  path="/blogs/:id"
                  element={
                    blog ? (
                      <Blog
                        blog={blog}
                        updateBlog={updateBlog}
                        removeBlog={removeBlog}
                        userId={user.id}
                      />
                    ) : (
                      <p>Could not find a blog</p>
                    )
                  }
                />
              )}
              {!user && (
                <Route
                  path="/blogs/:id"
                  element={
                    <Blog
                      blog={blog}
                      updateBlog={updateBlog}
                      removeBlog={removeBlog}
                      userId={null}
                    />
                  }
                />
              )}

              <Route
                path="/login"
                element={
                  <LoginForm
                    setUser={setUser}
                    setNotification={setNotification}
                    setSuccessStatus={setSuccessStatus}
                  />
                }
              />
              <Route
                path="/create"
                element={<NewBlogForm createBlog={addBlog} />}
              />
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<SplatRoute />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </Container>
  );
};
export default App;
