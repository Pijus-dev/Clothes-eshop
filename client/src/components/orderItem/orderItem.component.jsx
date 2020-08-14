import React from "react";

import styles from "./order-item.module.scss";

const OrderItem = ({ item }) => {
  const { name, quantity, price, size, color, date } = item;
  return (
    <div className={styles.orderItems}>
      <div className={styles.item}>
        <span>{name}</span>
      </div>
      <div className={styles.item}>
        <span>{quantity}</span>
      </div>
      <div className={styles.item}>
        <span>&euro;{price}</span>
      </div>
      <div className={styles.item}>
        <span>{color}</span>
      </div>
      <div className={styles.item}>
        <span>{size}</span>
      </div>
      <div className={styles.item}>
        <span>{date.toDate().toLocaleDateString("lt")}</span>
      </div>
    </div>
  );
};

export default React.memo(OrderItem);
