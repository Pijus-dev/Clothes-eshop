import React, { useState, useEffect } from "react";

import { firestore } from "../../firebase/firebase";

import Spinner from "../../components/common/spinner/spinner.component";

import OrderItem from "../../components/orderItem/orderItem.component";

import { userId } from "../../helpers/currentUserId";

import styles from "./order.module.scss";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState([]);

  const getCartItems = () => {
    firestore
      .collection("users")
      .doc(userId)
      .collection("cartItems")
      .get()
      .then((data) => {
        const array = [];
        data.forEach((doc) => {
          const obj = {
            name: doc.data().name,
            quantity: doc.data().quantity,
            price: doc.data().price,
            color: doc.data().color,
            size: doc.data().size,
            date: doc.data().date,
          };
          array.push(obj);
        });
        if (array.length > 0) {
          setKeys(Object.keys(array[0]));
        }
        setOrder(array);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className={styles.orderPage}>
      <Spinner isLoading={loading} />
      {keys.length > 0 ? (
        <h2>Order List</h2>
      ) : (
        <h2>You do not have any orders yet</h2>
      )}
      <div className={styles.orderHeader}>
        {keys.map((key) => (
          <div className={styles.headerBlock}>
            <span>{key}</span>
          </div>
        ))}
      </div>
      {order.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Order;
