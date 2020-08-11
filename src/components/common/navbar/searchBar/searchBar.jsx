import React, { useState, useEffect } from "react";
import "./searchBar.scss";

import { FaSearch } from "react-icons/fa";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setSearchText } from "../../../../redux/searchQuery/searchQuery.actions";
import { selectSearchQuery } from "../../../../redux/searchQuery/searchQuery.selector";

const SearchBar = ({ setSearchText, searchText }) => {
 
  return (
    <div className="search">
      <div className="search-group">
        <FaSearch className="icon" />
        <input
          type="text"
          placeholder="search for products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText ? <div className="delete">&#10005;</div> : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSearchText: (text) => dispatch(setSearchText(text)),
});

const mapStateToProps = createStructuredSelector({
  searchText: selectSearchQuery,
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);
