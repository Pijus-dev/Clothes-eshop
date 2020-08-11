import React from "react";

import StripeCheckout from "react-stripe-checkout";

import swal from "sweetalert";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_i28ouERO9Dli1OlxDdGM7HFA00hCEjnkrw";

  const onToken = (token) => {
    swal("YESS !!", "Payment was successful", "success");
  };

  return (
    <StripeCheckout
      label="PAY NOW"
      name="Clothes Shop"
      billingAddress
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

export default StripeCheckoutButton;
