import React, { useState } from "react";

import FormInput from "../../components/common/form-input/formInput.component";
import CustomButton from "../../components/common/customButton/customButton";

import Notification from "../../components/common/notification/notification.component";

import { auth, signInWithGoogle } from "../../firebase/firebase";

import styles from "./login.module.scss";

const Login = () => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);

  const { email, password } = userCredentials;
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
     await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className={styles.loginContent}>
      <div
        className={`${styles.signIn} sign-up animate__animated animate__bounceInDown`}
      >
        <h2 className={styles.title}>Sign in with your email and password</h2>
        <Notification
          display={display}
          errorMessage={errorMessage}
          message={message}
        />
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
            label="email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            handleChange={handleChange}
            label="password"
            required
          />
          <div className={styles.buttons}>
            <CustomButton type="submit">SIGN IN</CustomButton>
            <CustomButton
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
