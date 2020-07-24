import React from "react";

import { Route, Switch } from "react-router-dom";
import SignIn from "../src/components/common/sign-in/signIn.component";
import Navbar from "../src/components/common/navbar/navbar.component";

import Products from "./pages/shop.component";
import "./App.scss";

import SideBar from "./components/common/sideBar/sideBar";

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Navbar />
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/" component={Products} />
        </Switch>
      </div>
    );
  }
}

export default App;
