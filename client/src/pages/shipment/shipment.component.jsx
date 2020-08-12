import React from "react";

import styles from "./shipment.module.scss";

const Shipment = () => (
  <div className={styles.order}>
    <img
      src="https://media.giphy.com/media/1qcKryQqXOLOtTjdXw/giphy.gif"
      alt="truck driver"
    />
    <h2>Your Order is on the way....</h2>
  </div>
);

export default Shipment;
