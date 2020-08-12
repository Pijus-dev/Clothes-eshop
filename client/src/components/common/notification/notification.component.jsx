import React from "react";
import "./notification.scss";

const Notification = ({ message, display, errorMessage }) => (
  <div
    className={`${errorMessage ? "error" : ""} ${
      display ? "success" : ""
    } notification`}
  >
    {message ? message : errorMessage}
  </div>
);
export default Notification;
