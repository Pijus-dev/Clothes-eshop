import React from "react";
import "./searchBar.scss";

import { FaSearch } from "react-icons/fa";

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      searchText: "",
    };
  }
  render() {
    return (
      <div className="search">
        <div className="search-group">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="search"
            value={this.state.searchText}
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
          {/* <div className="delete">&#10005;</div> */}
        </div>
      </div>
    );
  }
}

export default SearchBar;
