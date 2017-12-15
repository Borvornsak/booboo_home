import React from "react";
import "antd/dist/antd.css";
import { Form, TimePicker, Input, Radio } from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class FillFoodPage extends React.Component {
  state = {
    fillType: 1,
    fillBy: 1,
    max: "",
    remain: ""
  };
  onTypeChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      fillType: e.target.value
    });
  };
  onByChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      fillBy: e.target.value
    });
  };
  handleMaxChange = e => {
    const max = parseInt(e.target.value || 0, 10);
    if (isNaN(max)) {
      return;
    }
    if (!("value" in this.props)) {
      this.setState({ max });
    }
  };
  handleRemainChange = e => {
    const remain = parseInt(e.target.value || 0, 10);
    if (isNaN(remain)) {
      return;
    }
    if (!("value" in this.props)) {
      this.setState({ remain });
    }
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
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="maximum food per day (grams)">
            <Input
              style={{ width: 150 }}
              placeholder="fill grams of food"
              onChange={this.handleMaxChange}
              value={this.state.max}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="How to fill">
            <RadioGroup
              onChange={this.onTypeChange}
              value={this.state.fillType}
            >
              <Radio value={1}>Automatic</Radio>
              <Radio value={2}>Manual</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem {...formItemLayout} label="Fill by">
            <RadioGroup onChange={this.onByChange} value={this.state.fillBy}>
              <Radio value={1}>Quantity</Radio>
              <Radio value={2}>Time</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem {...formItemLayout} label="Fill when food remain (grams)">
            <Input
              style={{ width: 150 }}
              disabled={this.state.fillType === 2 || this.state.fillBy === 2}
              placeholder="fill grams of food"
              onChange={this.handleRemainChange}
              value={this.state.remain}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="Time to fill">
            <TimePicker
              format="HH:mm"
              use12Hours
              disabled={this.state.fillType === 2 || this.state.fillBy === 1}
            />
          </FormItem>
        </Form>
        {/* </Card> */}
      </div>
    );
  }
}
