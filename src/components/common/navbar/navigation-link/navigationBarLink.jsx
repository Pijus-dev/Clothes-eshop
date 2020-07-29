import React from "react";
import "./navigationBarLink.scss";

import NavigationDropdown from "../navigation-bar/navigation-dropdown/navigationBarDropdown";

class NavigationBarLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      link,
      categories,
      handleChange,
      showMenu,
      handleCategoryChange,
    } = this.props;
    return (
      <span className="navigation-bar__link">
        <a
          className={`${showMenu ? "active" : null} navigation-bar__link__href`}
          href={link ?? null}
          onClick={handleChange}
        >
          {title}
        </a>
        {categories ? (
          <NavigationDropdown
            open={showMenu}
            categories={categories}
            handleCategoryChange={handleCategoryChange}
          />
        ) : null}
      </span>
    );
  }
}
export default NavigationBarLink;
