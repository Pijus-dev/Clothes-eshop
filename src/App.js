import React from "react";

import { Route, Switch } from "react-router-dom";

import { auth, createUserProfile } from "./firebase/firebase";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import SignIn from "./pages/sign-in/signIn.component";
import Login from "./pages/login/login";

import Navbar from "../src/components/common/navbar/navbar.component";
import Footer from "../src/components/common/footer/footer.component";

import Products from "./pages/shop.component";
import "./App.scss";

import SideBar from "./components/common/sideBar/sideBar";

class App extends React.Component {
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
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div id="app">
        <Navbar />
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Products} />
        </Switch>
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
