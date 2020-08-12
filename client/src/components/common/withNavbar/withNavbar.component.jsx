import React, {Component} from "react";

import Navbar from "../navbar/navbar.component";

const WithNavbar = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <div>
          <Navbar />
          <WrappedComponent />
        </div>
      );
    }
  };
};

export default WithNavbar;
