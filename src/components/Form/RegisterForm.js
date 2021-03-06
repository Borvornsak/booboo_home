import React from "react";
import styled from "styled-components";
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

const Container = styled.div`
  border-radius: 5px;
  width: 35%;
  height: auto;
  padding: 20px 20px;
  background: white;
  display: inline-flex;
  align-items: center;
  align-content: center;
  justify-content: space-around;
`;

class RegisterForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    visible: false,
    loading: false,
    iconLoading: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  enterLoading = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false
      });
      this.props.onClick();
    }, 2000);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "66"
    })(
      <Select style={{ width: 70 }}>
        <Option value="66">+66</Option>
      </Select>
    );

    return (
      <Container>
        <Form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.checkPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Serial Number"
          >
            {getFieldDecorator("Serial Number", {
              rules: [
                {
                  required: true,
                  message: "Please input product's serial number!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <a href="">agreement </a>
              </Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.enterLoading}>
              Register
            </Button>
          </FormItem>
        </Form>
      </Container>
    );
  }
}
const WrappedRegisterForm = Form.create()(RegisterForm);
export default WrappedRegisterForm;
