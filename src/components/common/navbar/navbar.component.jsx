import React from "react";
import styles from "./navbar.module.scss";

import { Link } from "react-router-dom";

import { auth } from "../../../firebase/firebase";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { selectCartHidden } from "../../../redux/cart/cart.selectors";

import SearchBar from "./searchBar/searchBar";
import { Route, Switch } from "react-router-dom";
import SignIn from "../../../pages/sign-in/signIn.component";
import CartIcon from "../../cartIcon/cartIcon.component";
import Cart from "../../cart/cart.component";

import NavigationBar from "../navbar/navigation-bar/navigationBar";

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
    const { currentUser, hidden } = this.props;
    return (
      <div>
        <nav>
          <div className={className}>
            <div className={styles.navBorder}>
              <div className={styles.navContainer}>
                <div className={styles.logo}>
                  <Link to="/">
                    <Logo />
                  </Link>
                </div>
                <div className={styles.searchExpand}>
                  <SearchBar />
                  {currentUser ? <CartIcon /> : null}
                  {hidden ? null : <Cart />}
                  <Link className="links" to="/home">
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
                    <a href="" className="links" onClick={() => auth.signOut()}>
                      LOGOUT
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mobileSearch}>
            <SearchBar />
          </div>
        </nav>
        <div className="container">
          <NavigationBar />
        </div>
      </div>
    );
  }
}
const mapsStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
export default connect(mapsStateToProps)(Navbar);
