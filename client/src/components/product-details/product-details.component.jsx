import React, { useEffect, useState } from "react";
import Spinner from "../common/spinner/spinner.component";

import { withRouter } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { selectPopularProductsCollections } from "../../redux/popularProducts/popularProduct.selector";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { addItem } from "../../redux/cart/cartActions";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../common/customButton/customButton";

import "./product-details.scss";

const ProductDetails = ({
  db,
  addItem,
  collections,
  id,
  currentUser,
  history,
}) => {
  const [photo, setPhoto] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);

  const addProductToCart = () => {
    db.get()
      .then((data) => {
        setPhoto(data.data().imageUrl);
        setName(data.data().name);
        setPrice(data.data().price);
        setText(data.data().text);
        setSizes(data.data().size);
        setColors(data.data().color);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    addProductToCart();
  }, []);

  return (
    <div>
      <Spinner isLoading={loading} />
      <div className="single-product">
        <div className="photo">
          <Carousel showArrows={true}>
            {photo.map((image) => (
              <div key={image.id}>
                <img src={image} alt="slide-show picture" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="product-details">
          <h1>{name}</h1>
          <p>{text}</p>
          <div className="product-size">
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Please select a size</option>
              {sizes.map((item) => (
                <option value={item} key={item.id}>
                  {item}
                </option>
              ))}
            </select>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">Please select a color</option>
              {colors.map((item) => (
                <option value={item} key={item.id}>
                  {item}
                </option>
              ))}
            </select>

            <h3>Price: &euro;{price}</h3>
            {currentUser ? (
              <CustomButton
                onClick={() =>
                  addItem({
                    ...collections.find((el) => el.id === id),
                    selectedColor: color,
                    selectedSize: size,
                  })
                }
              >
                ADD TO CART
              </CustomButton>
            ) : (
              <CustomButton onClick={() => history.push("/signin")}>
                SIGN IN FIRST
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

const mapStateToProps = createStructuredSelector({
  collections: selectPopularProductsCollections,
  currentUser: selectCurrentUser,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
