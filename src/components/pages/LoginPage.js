import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Button from "../Button";
import { COLOR } from "../Variables";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${COLOR.primaryConfido};
`;

const Header = styled.div`
  width: 100vw;
  height: 100px;
  background: ${COLOR.secondaryConfido};
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
      <Container>
        <Header
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button
            text="Login"
            style={{ height: "44px" }}
            onClick={this.showModal}
            outline
          />
          <Modal
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>{ModalText}</p>
          </Modal>
        </Header>
      </Container>
    );
  }
}

export default LoginPage;
