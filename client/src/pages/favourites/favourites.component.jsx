import React, { useEffect, useState } from "react";

import { firestore } from "../../firebase/firebase";

import Product from "../../components/products/product.component";

import styles from "./favourites.module.scss";

const Favourites = () => {
  const [favProductId, setFavProductId] = useState([]);
  const [favProducts, setFavProducts] = useState([]);

  const data = localStorage.getItem("persist:root");
  const currentUser = JSON.parse(JSON.parse(data).user).currentUser;
  const userId = currentUser.id ?? currentUser.uid;

  const getFavouriteProductsId = () => {
    firestore
      .collection("users")
      .doc(userId)
      .collection("favourites")
      .get()
      .then((data) => {
        const array = [];
        data.forEach((doc) => {
          const obj = {
            id: doc.data().id,
          };
          array.push(obj);
        });
        setFavProductId(array);
      });
  };

  const getFavouriteProducts = () => {
    firestore
      .collection("allProducts")
      .where(
        "id",
        "in",
        favProductId.map(({ id }) => id)
      )
      .get()
      .then((data) => {
        const array = [];
        data.forEach((doc) => {
          const obj = {
            name: doc.data().name,
            imageUrl: doc.data().imageUrl,
            price: doc.data().price,
            id: doc.id,
          };
          array.push(obj);
        });
        setFavProducts(array);
      });
  };

  useEffect(() => {
    getFavouriteProductsId();
  }, []);

  useEffect(() => {
    if (favProductId.length > 0) {
      getFavouriteProducts();
    }
  }, [favProductId]);

  return (
    <div className={styles.favourites}>
      <h2>Favorite Products</h2>
      <div className={styles.products}>
        {favProducts.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
