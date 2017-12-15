import React from 'react'
import styled from "styled-components";
import "antd/dist/antd.css";
import { COLOR } from "../Variables";
import { Form, TimePicker, Input, Radio, Button, Card } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

export default class FillFoodPage extends React.Component {
  state = {
    value: 1,
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render(){
    return(
      <Container>
        <Header
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
        </ Header>

        <div style={{display: 'flex', alignItems:'center'}}>
          <Card
            title="- Fill Booboo Food -"
            bordered={false}
            style={{ position: 'relative', left: '30%', width: '40%',marginTop:25 ,textAlign: 'center' }}>
            <Form
              layout="horizontal"
            >
              <FormItem
                label="maximum food per day (grams)"
              >
                <Input style = {{width: 150}} placeholder="fill grams of food" />
              </FormItem>
              <FormItem
                label="How to fill"
              >
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                  <Radio value={1}>Automatic</Radio>
                  <Radio value={2}>Manual</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem
                label="Time to fill"
              >
                <TimePicker />
              </FormItem>

              <FormItem>
                <Button type="primary">Submit</Button>
              </FormItem>
            </Form>
          </Card>
        </div>

      </ Container>
    );
  }
}
