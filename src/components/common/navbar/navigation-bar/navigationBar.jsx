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
              title: "Clothes",
              icon: "girl-outfit",
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
              title: "Shoes",
              icon: "girl-shoe",
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
              title: "Accessories",
              icon: "girl-clothes",
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
              title: "Clothes",
              icon: "man-clothes",
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
              title: "Shoes",
              icon: "man-shoe",
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
              title: "Accessories",
              icon: "man-other",
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
