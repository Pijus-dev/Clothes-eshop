import React from "react";

import { withRouter, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../img/crown.svg";

import styles from "./home-cover.module.scss";

import { connect } from "react-redux";

import NewNavbar from "../../components/common/newNavbar/newNavbar.component";

const HomeCover = ({ history }) => (
  <div>
    <NewNavbar />
    <div className={styles.homePhotos}>
      <div className={styles.girlPhoto}>
        <div className={styles.text}>
          <button onClick={() => history.push("/shop/female")}>
            SHOP WOMAN
          </button>
        </div>
      </div>
      <div className={styles.manPhoto}>
        <div className={styles.text}>
          <button onClick={() => history.push("/shop/male")}>SHOP MAN</button>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(HomeCover);
