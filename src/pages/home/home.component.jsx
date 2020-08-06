import React from "react";

import Advert from "../../components/common/advert/advert.component";
import PopularProducts from "../../components/common/popularProducts/popularProducts";

import { firestore, getPopularProducts } from "../../firebase/firebase";

import { connect } from "react-redux";
import { popularProductsCollections } from "../../redux/popularProducts/popularProducts.action";

import "./home.scss";

class Home extends React.Component {
  componentDidMount() {
    const { popularProductsCollections } = this.props;
    getPopularProducts((data) => popularProductsCollections(data))

  }

  render() {
    return (
      <div className="grid">
        <Advert />
        <PopularProducts />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  popularProductsCollections: (collection) =>
    dispatch(popularProductsCollections(collection)),
});

export default connect(null, mapDispatchToProps)(Home);
