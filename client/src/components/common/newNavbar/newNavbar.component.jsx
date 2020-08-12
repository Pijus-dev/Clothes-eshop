import React from "react";

import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import { withRouter, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../../img/crown.svg";

import { auth } from "../../../firebase/firebase";

import styles from "./newNavbar.module.scss";

const NewNavbar = ({ currentUser }) => (
  <div className={styles.navbarContainer}>
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className={styles.links}>
        <Link to="/home">HOME</Link>
        {!currentUser ? <Link to="/login">LOGIN</Link> : null}
        {!currentUser ? <Link to="/signin">REGISTER</Link> : null}
        {currentUser ? (
          <Link onClick={() => auth.signOut()}>LOGOUT</Link>
        ) : null}
      </div>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(NewNavbar));
