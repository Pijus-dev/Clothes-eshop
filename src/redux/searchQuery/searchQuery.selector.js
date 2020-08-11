import { createSelector } from "reselect";

const selectSearch = (state) => state.query;

export const selectSearchQuery = createSelector(
  [selectSearch],
  (query) => query.searchValue
);
