import React from "react";

import styles from "./navigation-dropdown.module.scss";

import CategoryLinks from "../../navigation-bar/navigation-dropdown/category-links/categoryLinks";

import SvgIcon from "../../../../svgIcon/index.js";

const NavigationDropdown = ({ open, categories, otherLinks }) => {
  const categoryLinks = categories.map(({ link, title, icon }) => (
    <CategoryLinks
      key={title}
      icon={icon}
      color="black"
      link={link}
      title={title}
    />
  ));

  return (
    <div className={`${styles.navigation} ${open ? styles.show : ""}`}>
      <ul>{categoryLinks}</ul>
    </div>
  );
};

export default NavigationDropdown;
