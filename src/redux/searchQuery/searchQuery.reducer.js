import { SearchQueryTypes } from "./searchQuery.types";

const INITIAL_STATE = {
  searchValue: "",
};

const searchQueryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchQueryTypes.SET_FILTER:
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

export default searchQueryReducer;
