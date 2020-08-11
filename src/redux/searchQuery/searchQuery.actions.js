import { SearchQueryTypes } from "./searchQuery.types";

export const setSearchText = (value) => ({
  type: SearchQueryTypes.SET_FILTER,
  payload: value,
});
