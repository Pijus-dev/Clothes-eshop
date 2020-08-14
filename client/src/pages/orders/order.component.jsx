import React, { useState, useEffect } from "react";

import { firestore } from "../../firebase/firebase";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import OrderItem from "../../components/orderItem/orderItem.component";

import styles from "./order.module.scss";

const Order = () => {
  const [order, setOrder] = useState([]);
  const data = localStorage.getItem("persist:root");
  const currentUser = JSON.parse(JSON.parse(data).user).currentUser;
  const userId = currentUser.id ?? currentUser.uid;

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
      });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className={styles.orderPage}>
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
