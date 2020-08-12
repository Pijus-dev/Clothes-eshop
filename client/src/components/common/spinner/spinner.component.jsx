import React from "react";

import "./spinner.scss";

const Spinner = ({ isLoading }) => {
  return isLoading ? (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  ) : null;
};

export default Spinner;
