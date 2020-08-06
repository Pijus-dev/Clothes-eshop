import React from "react";

import styles from "./cart-item.module.scss";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className={styles.cartItem}>
    <img src={imageUrl} alt="item" />
    <div className={styles.itemDetails}>
      <span className={styles.name}>{name}</span>
      <span className={styles.price}>
        {quantity} x &euro;{price}
      </span>
    </div>
  </div>
);

export default CartItem;
