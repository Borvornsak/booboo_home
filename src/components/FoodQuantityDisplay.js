import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";

const DefaultProps = {
  currentQuantity: 0,
  maxQuantity: 0
};

const Container = styled.div`
  width: 25%;
  border-radius: 5px;
  margin: 1em 1em;
  background: white;
  font-family: system-ui;
`;

const Information = styled.div`
  padding: 0.75em 1em;
  font-size: 1.5rem;
`;

const Quantity = styled.div`
  font-size: 2rem;
  text-align: right;
  margin: 0.75em 0 0 0;
`;

const StateShow = styled.div`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0.5em 1em;
  background: ${props =>
    props.ratio <= 0.25 ? "#e28d8a" : props.ratio <= 0.75 ? "yellow" : "green"};
  color: white;
  font-size: 1.5rem;
  text-align: center;
`;

const FoodQuantityDisplay = ({ currentQuantity, maxQuantity, isNaN }) => {
  let ratio = currentQuantity / maxQuantity;
  return (
    <div>
      <Container>
        <Information>
          <b>Food Quantity</b>
          <br />
          <Quantity>
            {currentQuantity}/{maxQuantity} g
          </Quantity>
        </Information>
        <StateShow ratio={ratio}>
          state : {ratio <= 0.25 ? "Low" : ratio <= 0.75 ? "Medium" : "High"}
        </StateShow>
      </Container>
    </div>
  );
};

FoodQuantityDisplay.propTypes = {
  currentQuantity: PropTypes.number,
  maxQuantity: PropTypes.number,
  isNaN: PropTypes.bool
};

FoodQuantityDisplay.defaultProps = DefaultProps;

export default FoodQuantityDisplay;
