import React from "react";

import iconTypes from "./iconTypes";

const SvgIcon = ({ name, color = "initial" }) => {
  return <span style={{ fill: color }}>{iconTypes[name]()}</span>;
};

export default SvgIcon;
