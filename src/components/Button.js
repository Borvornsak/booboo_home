import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { darken } from "polished";

const DefaultProps = {
  secondary: false,
  fontSize: "1.5rem",
  color: "#fbe591",
  text: "default",
  outline: false,
  disabled: false
};

const MyButton = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1em 1em;
  background: ${props => props.color};
  color: #535067;
  border: 2px solid ${props => props.color};
  font-size: ${props => props.fontSize};
  opacity: ${props => (props.disabled ? 0.65 : 1)};

  &:hover {
    ${props =>
      !props.disabled &&
      css`
        color: #535067;
        background: ${props => darken(0.05, props.color)};
        border: 2px solid ${props => darken(0.05, props.color)};
      `};
  }

  ${props =>
    props.outline &&
    css`
      background: transparent;
      color: ${props => props.color};
      &:hover {
        color: #535067;
        background: ${props => props.color};
        border: 2px solid ${props => props.color};
      }
    `};
`;

const Button = ({ fontSize, color, text, outline, disabled }) => {
  return (
    <MyButton
      fontSize={fontSize}
      color={color}
      outline={outline}
      disabled={disabled}
    >
      {text}
    </MyButton>
  );
};

Button.propTypes = {
  secondary: PropTypes.bool,
  fontSize: PropTypes.string,
  color: PropTypes.string.isRequired,
  text: PropTypes.string,
  outline: PropTypes.bool
};

Button.defaultProps = DefaultProps;

export default Button;
