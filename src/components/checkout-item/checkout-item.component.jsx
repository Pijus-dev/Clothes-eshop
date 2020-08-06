import React from "react";
import "./checkout-item.scss";

import { connect } from "react-redux";
import {
  addItem,
  removeItem,
  clearItemFromCart,
} from "../../redux/cart/cartActions";

const CheckoutItem = ({ item, addItem, removeItem, clearItem }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="quantity-info">
          <div className="arrow" onClick={() => removeItem(item)}>
            -
          </div>
          <span className="value">{quantity}</span>
          <div className="arrow" onClick={() => addItem(item)}>
            +
          </div>
        </div>
      </span>
      <span className="price">&euro;{price}</span>
      <div className="remove-button" onClick={() => clearItem(item)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  clearItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
