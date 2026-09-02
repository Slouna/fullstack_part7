import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useNotificationActions } from "../store";
import { useUserActions } from "../store";
import { useCurrentUser } from "../store";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setNotification, setSuccessStatus } = useNotificationActions();
  const { logIn } = useUserActions();
  const user = useCurrentUser();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await logIn(username, password);

      await setSuccessStatus(true);
      await setNotification(`${loggedUser.name} logged in`);

      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setUsername("");
      setPassword("");

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
          <TextField
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
