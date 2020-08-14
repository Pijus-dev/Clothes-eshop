import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import popularProductsReducer from "./popularProducts/popularProducts.reducer";
import cartReducer from "./cart/cart.reducer";
import searchQueryReducer from "./searchQuery/searchQuery.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  popularProducts: popularProductsReducer,
  cart: cartReducer,
  query: searchQueryReducer,
});

export default persistReducer(persistConfig, rootReducer);
