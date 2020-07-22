import React from "react";
import "./advert.scss";

class Advert extends React.Component {
  render() {
    return (
      <aside className="grid__advert">
        <div className="container">
          <div className="advert">
            <img
              src="https://images.unsplash.com/photo-1530856021941-02c71be5926f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
              alt="advert"
            />
          </div>
          <div className="buttons">
            <button className="button button-men">For Men</button>
            <button className="button button-women">For Women</button>
          </div>
        </div>
      </aside>
    );
  }
}

export default Advert;
