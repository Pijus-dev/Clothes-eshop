import React from "react";
import "./sign-in.scss";

import FormInput from "../form-input/formInput.component";
import CustomButton from "../customButton/customButton";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      message: "",
      display: "",
    };
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up-content">
        <div className="sign-up">
          <h2>Welcome, please sign up</h2>
          <form className="sign-up-form">
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              // handleChange={this.handleChange}
              label="DisplayName"
              required
            ></FormInput>
            <FormInput
              type="email"
              name="email"
              value={email}
              // handleChange={this.handleChange}
              label="Email"
              required
            ></FormInput>
            <FormInput
              type="password"
              name="password"
              value={password}
              // handleChange={this.handleChange}
              label="Password"
              required
            ></FormInput>
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              // handleChange={this.handleChange}
              label="Confirm Password"
              required
            ></FormInput>
            <CustomButton type="submit">SIGN UP</CustomButton>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
