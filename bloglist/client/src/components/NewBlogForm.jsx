import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useBlogActions } from "../store";
import { useNotificationActions } from "../store";

const NewBlogForm = () => {
  const navigate = useNavigate();
  const { add } = useBlogActions();
  const { setNotification, setSuccessStatus } = useNotificationActions()

  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await add({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      });
      await setSuccessStatus(true)
      await setNotification(
        `A new blog: ${blogTitle}, by ${blogAuthor} added to to blog list!`,
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (e) {
      console.log(e)
      setSuccessStatus(false);
      setNotification("Adding new blog failed");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }

    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
    navigate("/");
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="Title"

            value={blogTitle}
            onChange={(event) => setBlogTitle(event.target.value)}
          />
          <p></p>
          <TextField
            label="Author"
            value={blogAuthor}
            onChange={(event) => setBlogAuthor(event.target.value)}
          />
          <p></p>
          <TextField
            label="URL"
            value={blogUrl}
            onChange={(event) => setBlogUrl(event.target.value)}
          />

          <p>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
