import React from "react";
import "./navigationBarLink.scss";

import NavigationDropdown from "../navigation-bar/navigation-dropdown/navigationBarDropdown";

class NavigationBarLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, link, categories } = this.props;
    return (
      <span className="navigation-bar__link">
        <a className="navigation-bar__link__href" href={link ?? ""}>
          {title}
        </a>
        {categories ? <NavigationDropdown /> : null}
      </span>
    );
  }
}
export default NavigationBarLink;
