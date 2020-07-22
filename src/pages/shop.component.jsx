import React from "react";

import Navbar from "../components/common/navbar/navbar.component";
import Advert from "../components/common/advert/advert.component";
import PopularProducts from "../components/common/popularProducts/popularProducts";

import "./shop.scss";

class Shop extends React.Component {
  render() {
    return (
      <div className="grid">
        <Navbar />
        <Advert />
        <PopularProducts />
      </div>
    );
  }
}

export default Shop;
