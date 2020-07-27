import React from "react";

import SvgIcon from "../../../../../svgIcon/index";

const CategoryLinks = ({ link, title, icon }) => (
  <li>
    <SvgIcon name={icon} color="black" /> <a href={link}>{title}</a>
  </li>
);
export default CategoryLinks;
