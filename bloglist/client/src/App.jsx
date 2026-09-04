import { useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import { AppBar, Container, Toolbar, Button } from "@mui/material";
import MainPage from "./components/MainPage";
import ErrorBoundary from "./components/ErrorBoundary";
import SplatRoute from "./components/SplatRoute";
import User from "./components/User";
import {
  useBlogs,
  useNotificationActions,
  useCurrentUserActions,
  useBlogActions,
  useUserActions,
} from "./store";
import { useCurrentUser } from "./store";
import UserList from "./components/UserList";

const App = () => {
  const blogs = useBlogs();
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const { setNotification, setSuccessStatus } = useNotificationActions();
  const user = useCurrentUser();
  const { logOut } = useCurrentUserActions();
  const { initializeCurrentUser } = useCurrentUserActions();
  const { initialize } = useBlogActions();
  const { initializeUsers } = useUserActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    initializeCurrentUser();
  }, []);

  useEffect(() => {
    initializeUsers();
  }, []);

  const handleLogOut = async () => {
    await logOut();
    setNotification(`logged out`);
    setSuccessStatus(true);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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
                  to="/users"
                  sx={hooverStyle}
                >
                  Users
                </Button>
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
              <Route
                path="/blogs/:id"
                element={blog ? <Blog /> : <p>Could not find a blog</p>}
              />
              <Route path="/users/:id" element={<User />} />

              <Route
                path="/login"
                element={
                  <LoginForm
                  //setUser={setUser}
                  />
                }
              />
              <Route path="/create" element={<NewBlogForm />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/users" element={<UserList />} />
              <Route path="*" element={<SplatRoute />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </Container>
  );
};
export default App;
