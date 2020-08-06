import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase";

import Product from "../../components/products/product.component";

import styles from "./shop.module.scss";

const Shop = () => {
  const { category, sex, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    firestore
      .collection("allProducts")
      .where("sexCategory", "==", sex)
      .where("mainCategory", "==", category)
      .where("subCategory", "==", subcategory)
      .get()
      .then((data) => {
        const array = [];
        data.forEach((doc) => {
          const obj = {
            name: doc.data().name,
            price: doc.data().price,
            imageUrl: doc.data().imageUrl,
            id: doc.id,
          };
          array.push(obj);
        });
        setProducts(array);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>{subcategory.toUpperCase()}</h1>
      <div className={styles.productsGrid}>
        {isLoading
          ? null
          : products.map((item) => <Product key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Shop;
