import React, { useState } from "react";
import "./sign-in.scss";

import FormInput from "../../components/common/form-input/formInput.component";
import CustomButton from "../../components/common/customButton/customButton";

import Notification from "../../components/common/notification/notification.component";

import { auth, createUserProfile } from "../../firebase/firebase";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);

  const { displayName, email, password, confirmPassword } = userInfo;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // setUserInfo({ message: "Passwords do not match", display: true });
      setErrorMessage("Passwords do not match");

      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfile(user, { displayName });

      setUserInfo({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setMessage("You have successfully logged in");
      setDisplay(true);
    } catch (e) {
      // setUserInfo({ message: e.message, display: true });
      setErrorMessage(e.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="sign-up-content">
      <div className="sign-up animate__animated animate__bounceInDown">
        <h2 className="title">Welcome, please sign up</h2>
        <Notification
          message={message}
          errorMessage={errorMessage}
          display={display}
        />
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            handleChange={handleChange}
            label="DisplayName"
            required
          ></FormInput>
          <FormInput
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
            label="Email"
            required
          ></FormInput>
          <FormInput
            type="password"
            name="password"
            value={password}
            handleChange={handleChange}
            label="Password"
            required
          ></FormInput>
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={handleChange}
            label="Confirm Password"
            required
          ></FormInput>
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
