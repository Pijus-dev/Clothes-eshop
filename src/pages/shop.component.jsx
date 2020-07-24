import React from "react";

import Advert from "../components/common/advert/advert.component";
import PopularProducts from "../components/common/popularProducts/popularProducts";

import "./shop.scss";

class Shop extends React.Component {
  render() {
    return (
      <div className="grid">
        <Advert />
        <PopularProducts />
      </div>
    );
  }
}

export default Shop;
