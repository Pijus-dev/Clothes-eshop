import React from "react";
import { bubble as Menu } from "react-burger-menu";

import girlIcon from "../../../img/boy.svg";
import boyIcon from "../../../img/girl.svg";
import logo from "../../../img/crown.svg";
import accessories from "../../../img/icons/manOther.svg";
import manShoes from "../../../img/icons/manShoes.svg";
import girlShoe from "../../../img/icons/girlShoe.svg";
import other from "../../../img/icons/other.svg";

import CustomButton from "../../common/customButton/customButton";

import "./sidebar.scss";

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menShow: false,
      girlShow: false,
    };
  }

  render() {
    return (
      <Menu {...this.props}>
        <div className="image">
          <img src={logo} alt="" />
        </div>
        <CustomButton className="custom-button">REGISTER</CustomButton>
        <CustomButton className="custom-button inverted">SIGN UP</CustomButton>
        <h3>Categories:</h3>
        <hr />
        <div clas="menu-item">
          <div className="catogories">
            <img
              src={girlIcon}
              alt="boyIcon"
              onClick={() =>
                this.setState((prevState) => ({ menShow: !prevState.menShow }))
              }
            />
            <div className="categories-expand">
              <div className="content">
                <a href="">Men Clothes</a>
              </div>
            </div>
          </div>
          <hr />
          {this.state.menShow ? (
            <div className="other-section">
              <div className="section-expanded">
                <img src={accessories} alt="accessories" />
                <a href="">Men Accessories</a>
              </div>
              <div className="section-expanded ">
                <img src={manShoes} alt="accessories" />
                <a href="">Men Shoes</a>
              </div>
            </div>
          ) : null}
        </div>
        <div clas="menu-item">
          <div className="catogories">
            <img
              src={boyIcon}
              alt="boyIcon"
              onClick={() =>
                this.setState((prevState) => ({
                  girlShow: !prevState.girlShow,
                }))
              }
            />
            <div className="categories-expand">
              <div className="content">
                <a href="">Women Clothes</a>
              </div>
            </div>
          </div>
          <hr />
          {this.state.girlShow ? (
            <div className="other-section">
              <div className="section-expanded">
                <img src={other} alt="accessories" />
                <a href="">Women Accessories</a>
              </div>
              <div className="section-expanded ">
                <img src={girlShoe} alt="accessories" />
                <a href="">Women Shoes</a>
              </div>
            </div>
          ) : null}
        </div>
      </Menu>
    );
  }
}

export default SideBar;
