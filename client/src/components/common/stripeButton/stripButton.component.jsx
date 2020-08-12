import React from "react";

import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

import swal from "sweetalert";
import { withRouter } from "react-router-dom";

import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { selectCartItems } from "../../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { clearAllItems } from "../../../redux/cart/cartActions";

const StripeCheckoutButton = ({
  price,
  history,
  currentUser,
  dispatch,
  cartItems,
}) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_i28ouERO9Dli1OlxDdGM7HFA00hCEjnkrw";

  let quantity;
  quantity = cartItems.map((item) => {
    return (
      item.quantity + "x" + item.name + item.selectedColor + item.selectedSize
    );
  });

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
        order: quantity.toString(),
      },
    })
      .then((repsonse) => {
        swal("YESS !!", "Payment was successful", "success");
        history.push("/shipment");
        dispatch(clearAllItems());
        localStorage.clear();
      })
      .catch((error) => {
        swal("OOPS!!", "There was an issue with your payment", "error");
      });
  };

  return (
    <StripeCheckout
      label="PAY NOW"
      name="Clothes Shop"
      billingAddress
      email={currentUser.email}
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total price is €${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(StripeCheckoutButton));
