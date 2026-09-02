import { Alert } from "@mui/material";
import { useNotifications, useSuccessStatus } from "../store";

const Notification = () => {
  const notification = useNotifications();
  const success = useSuccessStatus();
  if (notification === null) {
    return null;
  }
  if (success) {
    return (
      <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={"success"}>
        {notification}
      </Alert>
    );
  } else {
    return (
      <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={"error"}>
        {notification}
      </Alert>
    );
  }
};
export default Notification;
