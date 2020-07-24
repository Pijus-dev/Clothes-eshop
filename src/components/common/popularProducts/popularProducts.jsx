import React from "react";
import Product from "../../products/product.component";

import loadingGif from "../../../img/loading.gif";

import { SHOP_DATA } from "../../../shopData";

import "./popularProducts.scss";

class PopularProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      products: SHOP_DATA.collections,
      productsLoading: false
    }
  }

  // handleScroll = (e) => {
  //   if(document.body.scrollHeight - window.scrollY < 2 * window.innerHeight &&
  //     !this.state.productsLoading){
  //       this.setState({
  //         productsLoading: true
  //       })
  //       // Imituojamas duomenu gavimas is API
  //     setTimeout(() => {
  //       this.setState({ 
  //         products: [...this.state.products, ...SHOP_DATA.collections],
  //         productsLoading: false
  //       })
  //     }, 2000);
  //   }
  // }

  // componentDidMount () {
  //   window.addEventListener('scroll', this.handleScroll);
  // }
  render() {
    return (
      <section className="grid__main">
        <div className="container">
          <h1>Popular Products</h1>
          <hr />
          <div className="product-grid">
            {this.state.products.map(({ id, ...otherProps }) => (
              <Product key={id} {...otherProps} />
            ))}
          </div>
          
        </div>
      </section>
    );
  }
}
export default PopularProducts;
