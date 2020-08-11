import React, { createRef } from "react";
import NavigationBarLink from "../navigation-link/navigationBarLink";

import { navigationLinks } from "../../../../helpers/dropdownLinks";

import "./navigation-bar.scss";

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      navigationLinks,
    };
    this.navigationBaref = createRef();
  }

  closeDropdown = (e) => {
    if (
      this.navigationBaref &&
      !this.navigationBaref.current.contains(e.target)
    ) {
      this.setState({
        navigationLinks: this.state.navigationLinks.map((el) => {
          return {
            ...el,
            showMenu: false,
          };
        }),
      });
    }
  };

  handleCategoryChange = (navLinkId) => {
    return (categoryId) => {
      this.setState({
        navigationLinks: this.state.navigationLinks.map((navLink) => {
          return {
            ...navLink,
            categories:
              navLink.id === navLinkId
                ? navLink.categories.map((category) => ({
                    ...category,
                    selected: category.id === categoryId,
                  }))
                : navLink.categories,
          };
        }),
      });
    };
  };

  toggleDropdown = (id) => {
    const linkIndex = this.state.navigationLinks.findIndex(
      (el) => el.id === id
    );
    this.setState({
      navigationLinks: this.state.navigationLinks.map((el, idx, arr) => {
        return {
          ...el,
          showMenu: el.id === id && !arr[idx].showMenu,
        };
      }),
    });
  };

  componentDidMount() {
    window.addEventListener("click", this.closeDropdown);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.closeDropdown);
  }

  render() {
    const navigationBarLinks = this.state.navigationLinks.map((navLinkObj) => (
      <NavigationBarLink
        key={navLinkObj.id}
        {...navLinkObj}
        {...(() =>
          navLinkObj.categories
            ? {
                handleChange: () => this.toggleDropdown(navLinkObj.id),
                handleCategoryChange: this.handleCategoryChange(navLinkObj.id),
                otherLinks: this.state.otherLinks,
              }
            : null)()}
      />
    ));
    return (
      <div className="navigation-bar" ref={this.navigationBaref}>
        {navigationBarLinks}
      </div>
    );
  }
}

export default NavigationBar;
