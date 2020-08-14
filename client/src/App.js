import React, { lazy, Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { auth, createUserProfile } from "./firebase/firebase";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import Navbar from "../src/components/common/navbar/navbar.component";
import Footer from "../src/components/common/footer/footer.component";
import Spinner from "../src/components/common/spinner/spinner.component";
import withNavbar from "../src/components/common/withNavbar/withNavbar.component";

import "./App.scss";

import SideBar from "./components/common/sideBar/sideBar";

const Home = lazy(() => import("./pages/home/home.component"));
const HomeCover = lazy(() => import("./pages/home-cover/home-cover.component"));
const SignIn = lazy(() => import("./pages/sign-in/signIn.component"));
const Login = lazy(() => import("./pages/login/login"));
const Shop = lazy(() => import("../src/pages/shop/shop.component"));
const Checkout = lazy(() => import("../src/pages/checkout/checkout.component"));
const SingleProduct = lazy(() =>
  import("../src/pages/singleProduct/singleProduct.component")
);
const Shipment = lazy(() => import("../src/pages/shipment/shipment.component"));
const Order = lazy(() => import("../src/pages/orders/order.component"));
const Favourites = lazy(() =>
  import("../src/pages/favourites/favourites.component")
);

const NotFound = lazy(() =>
  import("../src/pages/not-found/not-found.component")
);

const HomeWithNavbar = withNavbar(Home);
const ShopWithNavbar = withNavbar(Shop);
const SingleProductWithNavbar = withNavbar(SingleProduct);
const CheckoutWithNavbar = withNavbar(Checkout);
const ShipmentWithNavbar = withNavbar(Shipment);
const OrderWithNavbar = withNavbar(Order);
const FavouritesWithNavbar = withNavbar(Favourites);

class App extends React.Component {
  state = {
    isLoading: true,
  };
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          this.setState({
            isLoading: false,
          });
        });
      }
      this.setState({ isLoading: false });
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div id="app">
        {/* <Navbar /> */}
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        {!this.state.isLoading ? (
          <Switch>
            <Suspense fallback={<Spinner />}>
              <Route
                exact
                path="/signin"
                render={() =>
                  currentUser ? <Redirect to="/home" /> : <SignIn />
                }
              />
              <Route
                exact
                path="/login"
                render={() =>
                  currentUser ? <Redirect to="/home" /> : <Login />
                }
              />
              <Route exact path="/shop" component={ShopWithNavbar} />
              <Route exact path="/shop/:sex" component={ShopWithNavbar} />
              <Route
                exact
                path="/shop/:sex/:category"
                component={ShopWithNavbar}
              />
              <Route
                exact
                path="/shop/:sex/:category/:subcategory"
                component={ShopWithNavbar}
              />
              <Route
                exact
                path="/product/id/:id"
                component={SingleProductWithNavbar}
              />
              <Route exact path="/home" component={HomeWithNavbar} />
              <Route exact path="/" component={HomeCover} />
              <Route exact path="/checkout" component={CheckoutWithNavbar} />
              <Route exact path="/shipment" component={ShipmentWithNavbar} />
              <Route exact path="/orders" component={OrderWithNavbar} />
              <Route
                exact
                path="/favorites"
                component={FavouritesWithNavbar}
              />
              {/* <Route path="*" component={NotFound} /> */}
            </Suspense>
          </Switch>
        ) : null}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
