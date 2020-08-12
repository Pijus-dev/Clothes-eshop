import ShopActionTypes from "./popularProducts.types";

const INITIAL_STATE = {
  collections: [],
};

const popularProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.POPULAR_PRODUCTS_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};

export default popularProductsReducer;
