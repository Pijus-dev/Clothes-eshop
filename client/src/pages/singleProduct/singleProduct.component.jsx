import React from "react";

import Comment from "../../components/comment/comment.component";
import ProductDetails from "../../components/product-details/product-details.component";


import { firestore } from "../../firebase/firebase";
import { useParams } from "react-router-dom";

import styles from "./single-product.module.scss";

const SingleProduct = () => {
  const { id } = useParams();
  const db = firestore.collection("allProducts").doc(id);
  return (
    <div className={styles.singleProduct}>
      <ProductDetails db={db} id={id} />
      <Comment db={db} />
    </div>
  );
};

export default SingleProduct;
