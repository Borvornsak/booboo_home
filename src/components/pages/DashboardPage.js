import React from "react";
import styled from "styled-components";
import { Modal, Alert } from "antd";
import Button from "../Button";
import FoodQuantityDisplay from "../FoodQuantityDisplay";
import FillFoodForm from "../Form/FillFoodForm";
import ManualFillForm from "../Form/ManualFillForm";
import { COLOR } from "../Variables";
import emptyFood from "../../img/Booboo_home_empty.png";
import halfFood from "../../img/Booboo_home_few.png";
import moreFood from "../../img/Booboo_home_half.png";
import fullFood from "../../img/Booboo_home_full.png";
import logo from "../../img/Booboo_home_logo_1_5.png";
import axios from "axios";
import Microgear from "microgear";

const Header = styled.div`
  width: 100vw;
  height: 100px;
  padding: 0 50px 0 0;
  background: ${COLOR.secondaryConfido};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Body = styled.div`
  width: 100vw;
  position: absolute;
  top: 100px;
  bottom: 0;
  background: ${COLOR.primaryConfido};
  display: inline-flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
`;

const Display = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-around;
`;

const APPID = "BooBooHome"; //enter your appid
const KEY = "LxESkpmpJu6rYoZ"; //enter your key
const SECRET = "GH5dbnX3PUlf6aRWvrNKq191a"; //enter your secret
const ALIAS = "esp8266"; //same alias you set on NodeCMU
const url =
  "https://api.netpie.io/microgear/" +
  APPID +
  "/" +
  ALIAS +
  "?retain&auth=" +
  KEY +
  ":" +
  SECRET;
const ALIAS2 = "web";

const microgear = Microgear.create({
  key: KEY,
  secret: SECRET,
  alias: ALIAS2
});
microgear.on("message", function(topic, msg) {
  document.getElementById("raw_data").innerHTML = "Data = " + msg;
  //console.log(msg); // for debug
});
microgear.on("connected", function() {
  microgear.setAlias(ALIAS2);
  document.getElementById("connected_NETPIE").innerHTML = "Connected to NETPIE";
});
microgear.on("present", function(event) {
  console.log(event);
});
microgear.on("absent", function(event) {
  console.log(event);
});
microgear.resettoken(function(err) {
  microgear.connect(APPID);
});

class LoginPage extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.fetchWeigth();
    }, 1000);
  }
  state = {
    quantity: 0, //food quantity
    fill: 0, //fill quantity
    fillInModal: "", //fill show in modal
    ratio: 10, //ratio of food
    visible: false,
    confirmLoading: false,
    visible2: false,
    confirmLoading2: false,
    max: 1000, //max food
    maxInModal: 1000, //max food in modal
    check: false
  };
  fetchWeigth = () => {
    // axios
    //   .get(`${url}`)
    //   .then(function(response) {
    //     console.log(response.data);
    //   })
    //   .then(
    //     this.setState({
    //       ratio: this.state.fill * 100 / this.state.max
    //     })
    //   );
    let msg =
      parseInt(document.getElementById("raw_data").innerHTML.slice(7, 10), 10) |
      0;
    console.log(msg);
    this.setState({
      quantity: msg < 0 ? 0 : msg,
      ratio: msg * 100 / this.state.max
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
        max: this.state.maxInModal
      });
    }, 2000);
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  showModal2 = () => {
    this.setState({
      visible2: true
    });
  };
  handleOk2 = () => {
    let fillRatio = Math.floor(
      this.state.fillInModal * 100 / this.state.max / 25
    );
    fillRatio = fillRatio < 4 ? fillRatio + 1 : fillRatio;
    //console.log(fillRatio);
    this.setState({
      confirmLoading2: true
    });
    setTimeout(() => {
      this.setState({
        visible2: false,
        confirmLoading2: false,
        fill: this.state.fill + this.state.fillInModal
      });
      axios.put(`${url}`, fillRatio).then(function(response) {
        console.log(fillRatio);
      });
      console.log("Fill:", this.state.fillInModal);
      this.setState({ fillInModal: 0 });
    }, 2000);
  };
  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };
  changeMaxInModal = value => {
    this.setState({ maxInModal: value });
  };
  handleFill = value => {
    this.setState({ fillInModal: value });
  };
  handleCheck = () => {
    this.setstate({
      check: !this.state.check
    });
  };
  render() {
    const { visible, confirmLoading, visible2, confirmLoading2 } = this.state;
    return (
      <div>
        <Header>
          <img
            alt="logo"
            src={logo}
            style={{ width: "auto", height: "80%", cursor: "pointer" }}
            onClick={this.props.onLogout}
          />
          <Button text="Setting" onClick={this.showModal} outline />
          <Modal
            title="- Fill Booboo Food -"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            okText="Submit"
          >
            <FillFoodForm
              onChangeMax={this.changeMaxInModal}
              style={{ width: "100%" }}
            />
          </Modal>
        </Header>
        <Body>
          {this.state.ratio < 25 && (
            <div>
              <img
                alt="Empty Food"
                src={emptyFood}
                style={{ width: "auto", height: "80%" }}
              />
            </div>
          )}
          {this.state.ratio >= 25 &&
            this.state.ratio < 50 && (
              <img
                alt="Half Food"
                src={halfFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          {this.state.ratio >= 50 &&
            this.state.ratio < 75 && (
              <img
                alt="More Food"
                src={moreFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          {this.state.ratio >= 75 &&
            this.state.ratio <= 100 && (
              <img
                alt="Full Food"
                src={fullFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          <Display>
            {this.state.ratio < 25 && (
              <Alert
                message="Warning"
                description="Food quantity is low. Please feed your pet."
                type="warning"
                showIcon
              />
            )}
            <FoodQuantityDisplay
              currentQuantity={this.state.quantity}
              maxQuantity={this.state.max}
            />
            {/* <Button text="Refresh" size="2rem" onClick={this.fetchWeigth} /> */}
            <Button text="Feed!!!" size="2rem" onClick={this.showModal2} />
          </Display>
          <Modal
            title="- Feed Manually -"
            visible={visible2}
            onOk={this.handleOk2}
            confirmLoading={confirmLoading2}
            onCancel={this.handleCancel2}
            okText="Submit"
          >
            <ManualFillForm
              style={{ width: "100%" }}
              max={this.state.max}
              fill={this.state.fillInModal}
              wholeFill={this.state.fill}
              handleFill={this.handleFill}
            />
          </Modal>
        </Body>
      </div>
    );
  }
}

export default LoginPage;
