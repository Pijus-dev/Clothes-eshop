import React from "react";
import NavigationBarLink from "../navigation-link/navigationBarLink";

import "./navigation-bar.scss";

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      navigationLinks: [
        {
          title: "For Women",
          categories: [
            {
              title: "See all",
              link: "https://www.google.com/",
            },
            {
              title: "Clothes",
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
              title: "Shoes",
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
              title: "Accessories",
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
          title: "For Men",
          categories: [
            {
              title: "See all",
              link: "https://www.google.com/",
            },
            {
              title: "Clothes",
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
              title: "Shoes",
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
              title: "Accessories",
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
  }

  render() {
    const navigationBarLinks = this.state.navigationLinks.map(
      ({ title, link, categories }, i) => (
        <NavigationBarLink
          key={i}
          title={title}
          link={link}
          categories={categories}
        />
      )
    );
    return (
      <div className="container">
        <div className="navigation-bar">{navigationBarLinks}</div>
      </div>
    );
  }
}

export default NavigationBar;
