import React from "react";
import styles from "./advert.module.scss";

import Navigationbar from "../../common/navbar/navigation-bar/navigationBar";

class Advert extends React.Component {
  render() {
    return (
      <aside className={styles.gridAdvert}>
        <div className="container">
          <div className={styles.advert}>
          </div>
          <Navigationbar />
        </div>
      </aside>
    );
  }
}

export default Advert;
