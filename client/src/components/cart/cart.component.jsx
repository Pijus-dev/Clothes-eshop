import React from "react";
import styles from "./cart.module.scss";

import { withRouter } from "react-router-dom";

import CustomButton from "../common/customButton/customButton";
import CartItem from "../cart-item/cart-item.component";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cartActions";

const Cart = ({ cartItems, history, dispatch }) => (
  <div className={styles.cartDropdown}>
    <div className={styles.cartItems}>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <h2>Your Cart Is Empty</h2>
      )}
    </div>
    {cartItems.length ? (
      <CustomButton
        isGoogleSignIn
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    ) : null}
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(Cart));
