import React from "react";

import SvgIcon from "../../../../../svgIcon/index";

const CategoryLinks = ({ link, title, icon, changeCategory }) => (
  <li>
    <SvgIcon name={icon} color="black" /> <a  onClick={changeCategory} href={link}>{title}</a>
  </li>
);
export default CategoryLinks;
