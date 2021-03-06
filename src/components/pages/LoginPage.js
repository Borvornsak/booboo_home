import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Button from "../Button";
import WrappedLoginForm from "../Form/LoginForm";
import WrappedRegisterForm from "../Form/RegisterForm";
import { COLOR } from "../Variables";
import foodImg from "../../img/pet.png";
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

class LoginPage extends React.Component {
  state = {
    ModalText: "Content of the modal",
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
      this.props.onLogin();
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
        <Header>
          <img alt="logo" src={logo} style={{ width: "auto", height: "80%" }} />
          <Button text="Login" onClick={this.showModal} outline />
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
          <img
            alt="Pet Food"
            src={foodImg}
            style={{ width: "auto", height: "70%" }}
          />
          <WrappedRegisterForm onClick={this.props.onLogin}/>
        </Body>
      </div>
    );
  }
}

export default LoginPage;
