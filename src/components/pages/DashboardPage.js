import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
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

class LoginPage extends React.Component {
  state = {
    ratio: 10,
    visible: false,
    confirmLoading: false,
    visible2: false,
    confirmLoading2: false,
    max: 100,
    maxInModal: 100
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
    this.setState({
      confirmLoading2: true
    });
    setTimeout(() => {
      this.setState({
        visible2: false,
        confirmLoading2: false
      });
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
          {this.state.ratio <= 25 && (
            <img
              alt="Empty Food"
              src={emptyFood}
              style={{ width: "auto", height: "80%" }}
            />
          )}
          {this.state.ratio > 25 &&
            this.state.ratio <= 50 && (
              <img
                alt="Half Food"
                src={halfFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          {this.state.ratio > 50 &&
            this.state.ratio <= 75 && (
              <img
                alt="More Food"
                src={moreFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          {this.state.ratio > 75 &&
            this.state.ratio <= 100 && (
              <img
                alt="Full Food"
                src={fullFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          <Display>
            <FoodQuantityDisplay />
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
            <ManualFillForm style={{ width: "100%" }} max={this.state.max} />
          </Modal>
        </Body>
      </div>
    );
  }
}

export default LoginPage;
