import React, { useEffect, useState } from "react";
import "./singleProduct.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectPopularProductsCollections } from "../../redux//popularProducts/popularProduct.selector";

import CustomButton from "../../components/common/customButton/customButton";

import { addItem } from "../../redux/cart/cartActions";

import { firestore } from "../../firebase/firebase";
import { useParams } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const SingleProduct = ({ addItem, collections }) => {
  const { id } = useParams();
  const [photo, setPhoto] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    firestore
      .collection("popularProducts")
      .doc(id)
      .get()
      .then((data) => {
        setPhoto(data.data().imageUrl);
        setName(data.data().name);
        setPrice(data.data().price);
      });
  }, []);

  return (
    <div className="single-product">
      <div className="photo">
        <Carousel showArrows={true}>
          <div>
            <img src={photo[0]} alt="slides" />
          </div>
          <div>
            <img src={photo[1]} alt="slides" />
          </div>
          <div>
            <img src={photo[2]} alt="slides" />
          </div>
        </Carousel>
      </div>
      <div className="product-details">
        <h1>{name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae quae,
          voluptates officiis obcaecati cum tempore voluptatem placeat
          recusandae beatae animi consectetur ipsum incidunt architecto ab non
          quam aspernatur, labore quo!
        </p>
        <div className="product-size">
          <select>
            ƒ<option value="">Please select a size</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="S">S</option>
            <option value="M">M</option>
          </select>
          <select>
            <option>Please select a color</option>
            <option value="red">red</option>
            <option value="brown">brown</option>
            <option value="blue">blue</option>
            <option value="black">black</option>
          </select>

          <h3>Price: &euro;{price}</h3>
          <CustomButton
            onClick={() => addItem(collections.find((el) => el.id === id))}
          >
            ADD TO CART
          </CustomButton>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
