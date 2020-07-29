import React, { createRef } from "react";
import NavigationBarLink from "../navigation-link/navigationBarLink";

import "./navigation-bar.scss";

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      navigationLinks: [
        {
          id: "1",
          title: "For Women",
          showMenu: false,
          categories: [
            {
              title: "See all",
              icon: "all",
              // link: "https://www.google.com/",
            },
            {
              id: "girl-clothes",
              title: "Clothes",
              icon: "girl-outfit",
              selected: true,
              subcatogories: [
                {
                  title: "See All",
                  link: "https://www.google.com/",
                },
                {
                  title: "Sweaters",
                  link: "https://www.google.com/",
                },
                {
                  title: "Skirts",
                  link: "https://www.google.com/",
                },
                {
                  title: "Jeans",
                  link: "https://www.google.com/",
                },
              ],
            },
            {
              id: "girl-shoe",
              title: "Shoes",
              icon: "girl-shoe",
              selected: false,
              subcatogories: [
                {
                  title: "High Heels",
                  link: "https://www.google.com/",
                },
                {
                  title: "Sneakers",
                  link: "https://www.google.com/",
                },
                {
                  title: "Boots",
                  link: "https://www.google.com/",
                },
              ],
            },
            {
              id: "girl-accessorie",
              title: "Accessories",
              icon: "girl-clothes",
              selected: false,
              subcatogories: [
                {
                  title: "Glasses",
                  link: "https://www.google.com/",
                },
                {
                  title: "Piercings",
                  link: "https://www.google.com/",
                },
                {
                  title: "Other",
                  link: "https://www.google.com/",
                },
              ],
            },
          ],
        },
        {
          id: "2",
          title: "For Men",
          showMenu: false,
          categories: [
            {
              title: "See all",
              icon: "all",
              // link: "https://www.google.com/",
            },
            {
              id: "man-clothes",
              title: "Clothes",
              icon: "man-clothes",
              selected: true,
              subcatogories: [
                {
                  title: "See All",
                  link: "https://www.google.com/",
                },
                {
                  title: "Sweaters",
                  link: "https://www.google.com/",
                },
                {
                  title: "Skirts",
                  link: "https://www.google.com/",
                },
                {
                  title: "Jeans",
                  link: "https://www.google.com/",
                },
              ],
            },
            {
              id: "man-shoe",
              title: "Shoes",
              icon: "man-shoe",
              selected: false,
              subcatogories: [
                {
                  title: "Sandals",
                  link: "https://www.google.com/",
                },
                {
                  title: "Sneakers",
                  link: "https://www.google.com/",
                },
                {
                  title: "Boots",
                  link: "https://www.google.com/",
                },
              ],
            },
            {
              id: "man-accessorie",
              title: "Accessories",
              icon: "man-other",
              selected: false,
              subcatogories: [
                {
                  title: "Glasses",
                  link: "https://www.google.com/",
                },
                {
                  title: "Piercings",
                  link: "https://www.google.com/",
                },
                {
                  title: "Other",
                  link: "https://www.google.com/",
                },
              ],
            },
          ],
        },
        {
          id: "3",
          title: "About Us",
          link: "https://www.google.com/",
        },
      ],
      otherLinks: [
        {
          title: "Other",
          link: "https://www.google.com/",
        },
      ],
    };
    this.navigationBaref = createRef();
  }

  closeDropdown = (e) => {
    if (
      (this.navigationBaref &&
        !this.navigationBaref.current.contains(e.target))
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
