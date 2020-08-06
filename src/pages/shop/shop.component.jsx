import React from "react";

import { useParams } from "react-router-dom";

const Shop = () => {
  const { category, sex, subcategory } = useParams();
  return <h1>This is a shop Page</h1>;
};

export default Shop;
