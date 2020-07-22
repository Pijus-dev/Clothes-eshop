import React from "react";
import "./navbar.scss";

import SearchBar from "./searchBar/searchBar";

import logo from "/Users/user/Desktop/REACT/pamoka/src/img/logotipas.jpg";

class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
      className: "",
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 60) {
      if (!this.state.className) {
        this.setState({ className: "scroll" });
      }
    } else {
      if (this.state.className) {
        this.setState({ className: "" });
      }
    }
  };

  render() {
    const { showMenu } = this.state;
    return (
      <nav>
        <div className={this.state.className}>
          <div className="nav-border">
            <div className="nav-container">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              <div
                className={"menu-expand" + (showMenu ? " expanded" : "")}
                onClick={() => this.setState({ showMenu: !showMenu })}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <SearchBar />
      </nav>
    );
  }
}
export default Navbar;
