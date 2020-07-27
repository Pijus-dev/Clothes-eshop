import React from "react";
import styles from "./navbar.module.scss";

import { Link } from "react-router-dom";

import SearchBar from "./searchBar/searchBar";
import { Route, Switch } from "react-router-dom";
import SignIn from "../sign-in/signIn.component";

import { ReactComponent as Logo } from "/Users/user/Desktop/REACT/pamoka/src/img/crown.svg";

class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      className: "",
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 60) {
      if (!this.state.className) {
        this.setState({ className: styles.scroll });
      }
    } else {
      if (this.state.className) {
        this.setState({ className: "" });
      }
    }
  };

  render() {
    const { className } = this.state;
    return (
      <nav>
        <div className={className}>
          <div className={styles.navBorder}>
            <div className={styles.navContainer}>
              <div className={styles.logo}>
                <Logo />
              </div>
              <div className={styles.searchExpand}>
                <SearchBar />
                <Link className="links" to="/">
                  HOME
                </Link>
                <Link className="links" to="/signin">
                  REGISTER
                </Link>
                <Link className="links" to="/signin">
                  LOGIN
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mobileSearch}>
          <SearchBar />
        </div>
      </nav>
    );
  }
}
export default Navbar;
