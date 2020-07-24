import React from "react";
import "./product.scss";
import CustomButton from "../common/customButton/customButton";

const Product = ({ imageUrl, name, price }) => (
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
    <CustomButton>ADD TO CART</CustomButton>
  </div>
);

export default Product;
