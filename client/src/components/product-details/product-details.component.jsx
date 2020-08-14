import React, { useEffect, useState } from "react";
import Spinner from "../common/spinner/spinner.component";
import swal from "sweetalert";

import { withRouter } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { selectPopularProductsCollections } from "../../redux/popularProducts/popularProduct.selector";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { addItem } from "../../redux/cart/cartActions";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { firestore } from "../../firebase/firebase";

import { userId } from "../../helpers/currentUserId";

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
  const [favourites, setFavourites] = useState([]);
  const [isFavoured, setFavoured] = useState(false);

  const obj = { ...collections.find((el) => el.id === id) };

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

  const getFavouriteItems = () => {
    firestore
      .collection("users")
      .doc(userId)
      .collection("favourites")
      .get()
      .then((data) => {
        const array = [];
        data.forEach((doc) => {
          const obj = {
            itemId: doc.data().id,
            docId: doc.id,
          };
          array.push(obj);
        });
        setFavourites(array);
      });
  };

  useEffect(() => {
    addProductToCart();
    getFavouriteItems();
  }, []);

  useEffect(() => {
    if (favourites.length >= 0) {
      setFavoured(favourites.map(({ itemId }) => itemId).includes(obj.id));
    }
  }, [favourites]);

  const addItemToCart = () => {
    if (size == "" && color == "") {
      swal("", "You havent choose any color or size", "info");
    } else {
      addItem({
        ...collections.find((el) => el.id === id),
        selectedColor: color,
        selectedSize: size,
      });
    }
  };

  let fireId = favourites.find(({ itemId }) => itemId === obj.id);

  const addItemToFavourites = () => {
    if (isFavoured) {
      firestore
        .collection("users")
        .doc(userId)
        .collection("favourites")
        .doc(fireId.docId)
        .delete()
        .then(() => {
          setFavoured(false);
        });
    } else {
      firestore
        .collection("users")
        .doc(userId)
        .collection("favourites")
        .add({ id: obj.id })
        .then(() => {
          setFavoured(true);
        });
    }
  };

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
              <CustomButton onClick={() => addItemToCart()}>
                ADD TO CART
              </CustomButton>
            ) : (
              <CustomButton onClick={() => history.push("/signin")}>
                SIGN IN FIRST
              </CustomButton>
            )}
            <CustomButton
              className={`${isFavoured ? "unlike" : "like"} custom-button`}
              onClick={() => addItemToFavourites()}
            >
              {!isFavoured ? (
                <i class="far fa-heart fa-3x"></i>
              ) : (
                <i class="fas fa-heart-broken fa-3x"></i>
              )}
            </CustomButton>
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
  React.memo(connect(mapStateToProps, mapDispatchToProps)(ProductDetails))
);
