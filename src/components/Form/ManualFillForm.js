import React from "react";
import { Form, Input, Checkbox, Progress } from "antd";
import "antd/dist/antd.css";

const FormItem = Form.Item;

export default class ManualFillForm extends React.Component {
  state = {
    check: false,
    ratio: Math.floor(
      (this.props.wholeFill + this.props.fill) * 100 / this.props.max
    )
  };
  handleFillChange = e => {
    const fill = parseInt(e.target.value || 0, 10);
    if (isNaN(fill) || fill > this.props.max - this.props.wholeFill) {
      return;
    }
    if (!("value" in this.props)) {
      this.props.handleFill(fill);
      this.setState({ ratio: fill * 100 / this.props.max });
    }
  };
  handleCheckbox = e => {
    this.setState({
      ratio: !this.state.check
        ? 100
        : Math.floor(this.props.wholeFill * 100 / this.props.max) | 0,
      check: !this.state.check
    });
    this.props.handleFill(
      this.state.check ? 0 : this.props.max - this.props.wholeFill
    );
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    return (
      <div>
        <Form
          layout="horizontal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <FormItem {...formItemLayout} label="Fill Quantity (grams)">
            <Input
              style={{ width: 150 }}
              placeholder="fill grams of food"
              onChange={this.handleFillChange}
              value={this.props.fill}
              disabled={this.state.check}
            />
          </FormItem>
          <FormItem>
            <Checkbox onChange={this.handleCheckbox}>Fill until full</Checkbox>
          </FormItem>
          <Progress percent={this.state.ratio} />
        </Form>
      </div>
    );
  }
}
