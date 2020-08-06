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
              link: "/shop/female",
            },
            {
              id: "girl-clothes",
              title: "Clothes",
              icon: "girl-outfit",
              selected: true,
              subcatogories: [
                {
                  title: "See All",
                  link: "/shop/female/clothes/",
                },
                {
                  title: "Sweaters",
                  link: "/shop/female/clothes/jumpers",
                },
                {
                  title: "Skirts",
                  link: "/shop/female/clothes/skirts",
                },
                {
                  title: "Jeans",
                  link: "/shop/female/clothes/jeans",
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
                  link: "/shop/female/clothes/dresses",
                },
                {
                  title: "Sneakers",
                  link: "/shop/female/shoes/sandals",
                },
                {
                  title: "Boots",
                  link: "/shop/female/shoes/boots",
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
                  link: "/shop/female/accessories/glasses",
                },
                {
                  title: "Piercings",
                  link: "/shop/female/accessories/piercings",
                },
                {
                  title: "Other",
                  link: "/shop/female/accessories/other",
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
              link: "/shop/male",
            },
            {
              id: "man-clothes",
              title: "Clothes",
              icon: "man-clothes",
              selected: true,
              subcatogories: [
                {
                  title: "See All",
                  link: "/shop/male/clothes",
                },
                {
                  title: "Sweaters",
                  link: "/shop/male/clothes/sweaters",
                },
                {
                  title: "Jackets",
                  link: "/shop/male/clothes/jackets",
                },
                {
                  title: "Jeans",
                  link: "/shop/male/clothes/jeans",
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
                  link: "/shop/male/shoes/sandals",
                },
                {
                  title: "Sneakers",
                  link: "/shop/male/shoes/sneakers",
                },
                {
                  title: "Boots",
                  link: "/shop/male/shoes/boots",
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
                  link: "/shop/male/accessories/glasses",
                },
                {
                  title: "Piercings",
                  link: "/shop/male/accessories/piercings",
                },
                {
                  title: "Other",
                  link: "/shop/male/accessories/other",
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
