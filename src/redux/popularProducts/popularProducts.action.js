import ShopActionTypes from "./popularProducts.types";

export const popularProductsCollections = (collectionsMap) => ({
  type: ShopActionTypes.POPULAR_PRODUCTS_COLLECTIONS,
  payload: collectionsMap,
});
