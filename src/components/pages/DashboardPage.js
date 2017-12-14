import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Button from "../Button";
import WrappedLoginForm from "../Form/LoginForm";
import FoodQuantityDisplay from "../FoodQuantityDisplay";
import { COLOR } from "../Variables";
import emptyFood from "../../img/Booboo_home_empty.png";
import halfFood from "../../img/Booboo_home_few.png";
import moreFood from "../../img/Booboo_home_half.png";
import fullFood from "../../img/Booboo_home_full.png";

const Header = styled.div`
  width: 100vw;
  height: 100px;
  background: ${COLOR.secondaryConfido};
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
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-around;
`;

class LoginPage extends React.Component {
  state = {
    ratio: 50,
    visible: false,
    confirmLoading: false
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
        confirmLoading: false
      });
    }, 2000);
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Header
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button text="Setting" onClick={this.showModal} outline />
          <Modal
            title="Login"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            okText="Login"
          >
            <WrappedLoginForm />
          </Modal>
        </Header>
        <Body>
          {this.state.ratio <= 25 && (
            <img
              alt="Pet Food"
              src={emptyFood}
              style={{ width: "auto", height: "80%" }}
            />
          )}
          {this.state.ratio > 25 &&
            this.state.ratio <= 50 && (
              <img
                alt="Pet Food"
                src={halfFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          {this.state.ratio > 50 &&
            this.state.ratio <= 75 && (
              <img
                alt="Pet Food"
                src={moreFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          {this.state.ratio > 75 &&
            this.state.ratio <= 100 && (
              <img
                alt="Pet Food"
                src={fullFood}
                style={{ width: "auto", height: "80%" }}
              />
            )}
          <Display>
            <FoodQuantityDisplay />
            <Button text="Feed!!!" size="2rem" />
          </Display>
        </Body>
      </div>
    );
  }
}

export default LoginPage;
