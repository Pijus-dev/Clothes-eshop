import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Product from "../../products/product.component";

import { selectPopularProductsCollections } from "../../../redux/popularProducts/popularProduct.selector";

import "./popularProducts.scss";

const PopularProducts = ({ collections }) => (
  <section className="grid__main">
    <div className="container">
      <h1>Popular Products</h1>
      <hr />
      <div className="product-grid">
        {collections.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
);

const mapStateToProps = createStructuredSelector({
  collections: selectPopularProductsCollections,
});

export default connect(mapStateToProps)(PopularProducts);
