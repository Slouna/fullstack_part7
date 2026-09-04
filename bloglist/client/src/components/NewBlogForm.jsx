import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useBlogActions } from "../store";
import { useNotificationActions } from "../store";
import { useField } from "../hooks";

const NewBlogForm = () => {
  const navigate = useNavigate();
  const { add } = useBlogActions();
  const { setNotification, setSuccessStatus } = useNotificationActions();

  const blogTitle = useField("text");
  const blogAuthor = useField("text");
  const blogUrl = useField("text");

  const addBlog = async (event) => {
    event.preventDefault();
    console.log(blogTitle);
    try {
      await add({
        title: blogTitle.value,
        author: blogAuthor.value,
        url: blogUrl.value,
      });
      await setSuccessStatus(true);
      await setNotification(
        `A new blog: ${blogTitle.value}, by ${blogAuthor.value} added to to blog list!`,
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (e) {
      console.log(e);
      setSuccessStatus(false);
      setNotification("Adding new blog failed");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
    navigate("/");
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input {...blogTitle} />
        </div>

        <p></p>
        <div>
          Author
          <input {...blogAuthor} />
        </div>
        <p></p>
        <div>
          Url
          <input {...blogUrl} />
        </div>
        <div>
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
