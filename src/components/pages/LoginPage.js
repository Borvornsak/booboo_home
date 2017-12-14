import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Button from "../Button";
import WrappedRegisterForm from "../Form/RegisterForm";
import { COLOR } from "../Variables";
import foodImg from "../../img/pet.png";
import "antd/dist/antd.css";

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
      ModalText: "The modal will be closed after two seconds",
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
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Header
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button text="Login" onClick={this.showModal} outline />
          <Modal
            title="Title"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>{ModalText}</p>
          </Modal>
        </Header>
        <Body>
          <img
            alt="Pet Food"
            src={foodImg}
            style={{ width: "auto", height: "70%" }}
          />
          <WrappedRegisterForm />
        </Body>
      </div>
    );
  }
}

export default LoginPage;
