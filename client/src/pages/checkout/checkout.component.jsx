import React from "react";
import "./checkout.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/common/stripeButton/stripButton.component";

const Checkout = ({ cartItems, total, currentUser }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-content">
        {total > 0 ? (
          <p>This is your shopping cart, {currentUser.displayName}</p>
        ) : (
          <p>Your cart is empty, go back shopping, {currentUser.displayName}</p>
        )}
        <hr />
        <div>
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}
        </div>
        <div className="total">
          <span>TOTAL: &euro; {total}</span>
        </div>
        <div className="checkout-button">
          {total > 0 ? <StripeCheckoutButton price={total} /> : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Checkout);
