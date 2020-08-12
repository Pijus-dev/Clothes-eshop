import React from "react";

import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import styles from "./navigation-dropdown.module.scss";

import CategoryLinks from "../../navigation-bar/navigation-dropdown/category-links/categoryLinks";

import SvgIcon from "../../../../svgIcon/index.js";

const NavigationDropdown = ({
  open,
  categories,
  handleCategoryChange,
}) => {
  const categoryLinks = categories.map(({ link, title, icon, id }) => (
    <CategoryLinks
      key={title}
      icon={icon}
      color="black"
      link={link}
      title={title}
      changeCategory={() => handleCategoryChange(id)}
    />
  ));

  const subcategoriesLinks = categories
    .find((el) => el.selected)
    .subcatogories.map(({ title, link }) => (
      <li key={title} className={styles.subcategoryLink}>
        <Link to={link} className={styles.title}>
          {title}
        </Link>
      </li>
    ));

  return (
    <div  className={`${styles.navigation} ${open ? styles.show : ""}`}>
      <div className={styles.dropdown}>
        <div className={styles.menu}>
          <ul>{categoryLinks}</ul>
        </div>
        <div className={styles.line}></div>
        <div className={styles.other}>
          <ul>{subcategoriesLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NavigationDropdown);
