import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useNotificationActions } from "../store";
import { useUserActions } from "../store";
import { useCurrentUser } from "../store";
import { useField } from "../hooks";

const LoginForm = (props) => {
  const username = useField("text");
  const password = useField("password");
  const { setNotification, setSuccessStatus } = useNotificationActions();
  const { logIn } = useUserActions();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await logIn(username.value, password.value);

      await setSuccessStatus(true);
      await setNotification(`${loggedUser.name} logged in`);

      setTimeout(() => {
        setNotification(null);
      }, 5000);

      navigate("/");
    } catch (error) {
      console.log(error);
      setSuccessStatus(false);
      setNotification("Wrong username or password");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Login page</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input {...username} />
        </div>
        <div>
          Password
          <input {...password} />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
