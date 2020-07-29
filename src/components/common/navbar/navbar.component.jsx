import React from "react";
import styles from "./navbar.module.scss";

import { Link } from "react-router-dom";

import { auth } from "../../../firebase/firebase";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";

import SearchBar from "./searchBar/searchBar";
import { Route, Switch } from "react-router-dom";
import SignIn from "../../../pages/sign-in/signIn.component";

import { ReactComponent as Logo } from "/Users/user/Desktop/REACT/pamoka/src/img/crown.svg";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

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
    const { currentUser } = this.props;
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
                {!currentUser ? (
                  <Link className="links" to="/signin">
                    REGISTER
                  </Link>
                ) : null}
                {!currentUser ? (
                  <Link className="links" to="/login">
                    LOGIN
                  </Link>
                ) : null}
                {currentUser ? (
                  <div className="links" onClick={() => auth.signOut()}>
                    <a href="" onClick={() => auth.signOut()}>
                      LOGOUT
                    </a>
                  </div>
                ) : null}
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
const mapsStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapsStateToProps)(Navbar);
