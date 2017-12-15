import React from "react";
import { Form, Input, Checkbox, Progress } from "antd";
import "antd/dist/antd.css";

const FormItem = Form.Item;

export default class ManualFillForm extends React.Component {
  state = {
    fill: "",
    check: false,
    ratio: 0
  };
  handleFillChange = e => {
    const fill = parseInt(e.target.value || 0, 10);
    if (isNaN(fill) || fill > this.props.max) {
      return;
    }
    if (!("value" in this.props)) {
      this.setState({ fill, ratio: fill * 100 / this.props.max });
    }
  };
  handleCheckbox = e => {
    this.setState({
      ratio: !this.state.check ? 100 : this.state.fill | 0,
      check: !this.state.check
    });
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
              value={this.state.fill}
              disabled={this.state.check}
            />
          </FormItem>
          <FormItem>
            <Checkbox onChange={this.handleCheckbox}>Fill until full</Checkbox>
          </FormItem>
          <Progress percent={Math.floor(this.state.ratio)} />
        </Form>
        {/* </Card> */}
      </div>
    );
  }
}
