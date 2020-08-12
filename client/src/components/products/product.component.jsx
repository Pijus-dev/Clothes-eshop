import React from "react";
import "./product.scss";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { addItem } from "../../redux/cart/cartActions";

import CustomButton from "../common/customButton/customButton";

const Product = ({ item, history }) => {
  const { imageUrl, name, price, id } = item;

  const redirect = (productId) => {
    history.push("/product/id/" + productId);
  };

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url( ${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name"> {name}</span>
        <span className="price"> &euro;{price}</span>
      </div>
      <CustomButton onClick={() => redirect(id)}>Check More</CustomButton>
    </div>
  );
};

export default withRouter(Product);
