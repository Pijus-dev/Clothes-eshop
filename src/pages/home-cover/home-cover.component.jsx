import React from "react";

import { withRouter, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../img/crown.svg";

import styles from "./home-cover.module.scss";

import { connect } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase";

const HomeCover = ({ history, currentUser }) => (
  <div className={styles.backgroundPhoto}>
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className={styles.links}>
        {!currentUser ? <Link to="/login">LOGIN</Link> : null}
        {!currentUser ? <Link to="/signin">REGISTER</Link> : null}
        {currentUser ? (
          <Link onClick={() => auth.signOut()}>LOGOUT</Link>
        ) : null}
      </div>
    </div>
    <div className={styles.text}>
      <button onClick={() => history.push("/home")}>SHOP NOW</button>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(HomeCover));
