import { createSelector } from "reselect";

const selectPopularProducts = (state) => state.popularProducts;

export const selectPopularProductsCollections = createSelector(
  [selectPopularProducts],
  (popularProducts) => popularProducts.collections
);
