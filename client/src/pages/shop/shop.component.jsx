import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useParams } from "react-router-dom";
import { firestore, createProductObject } from "../../firebase/firebase";

import { popularProductsCollections } from "../../redux/popularProducts/popularProducts.action";

import { selectSearchQuery } from "../../redux/searchQuery/searchQuery.selector";

import Product from "../../components/products/product.component";
import Spinner from "../../components/common/spinner/spinner.component";

import styles from "./shop.module.scss";

const Shop = ({ popularProductsCollections, searchValue }) => {
  const { category, sex, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);

  const queryProducts = () => {
    let collection = firestore.collection("allProducts");

    if (sex) collection = collection.where("sexCategory", "==", sex);
    if (category) collection = collection.where("mainCategory", "==", category);
    if (subcategory)
      collection = collection.where("subCategory", "==", subcategory);
    collection
      .get()
      .then((data) => {
        const array = [];
        data.forEach((doc) => {
          array.push(createProductObject(doc));
        });
        setProducts(array);
        popularProductsCollections(array);
        setLoading(false);
      })
      .then(() => {
        setSpinner(false);
      });
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  useEffect(() => {
    queryProducts();
  }, []);

  return (
    <div>
      <Spinner isLoading={spinner} />
      <div className={styles.filteredProducts}>
        {subcategory ? (
          <h2>{subcategory.toUpperCase()}</h2>
        ) : (
          <h2>All Clothes</h2>
        )}
        <div className={styles.productsGrid}>
          {isLoading
            ? null
            : filteredProducts.map((item) => (
                <Product key={item.id} item={item} />
              ))}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  popularProductsCollections: (collection) =>
    dispatch(popularProductsCollections(collection)),
});

const mapStateToProps = createStructuredSelector({
  searchValue: selectSearchQuery,
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
