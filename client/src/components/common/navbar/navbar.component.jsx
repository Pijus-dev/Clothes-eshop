import React from "react";
import styles from "./navbar.module.scss";

import { Link } from "react-router-dom";

import { auth } from "../../../firebase/firebase";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { selectCartHidden } from "../../../redux/cart/cart.selectors";

import SearchBar from "./searchBar/searchBar";
import { withRouter } from "react-router-dom";
import SignIn from "../../../pages/sign-in/signIn.component";
import CartIcon from "../../cartIcon/cartIcon.component";
import Cart from "../../cart/cart.component";

import NavigationBar from "../navbar/navigation-bar/navigationBar";

import { ReactComponent as Logo } from "../../../img/crown.svg";

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
    const { currentUser, hidden, history } = this.props;
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
                  {currentUser ? (
                    <Link className="links" to="/favorites">
                      <img src="https://img.icons8.com/ios/24/000000/like.png" />
                    </Link>
                  ) : null}
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
                    <Link className="links" to="/orders">
                      ORDERS
                    </Link>
                  ) : null}
                  {currentUser ? (
                    <a
                      href=""
                      className="links"
                      onClick={() => {
                        auth.signOut();
                        window.localStorage.clear();
                        history.push("/");
                      }}
                    >
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
export default withRouter(connect(mapsStateToProps)(Navbar));
