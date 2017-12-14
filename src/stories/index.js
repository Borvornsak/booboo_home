import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import backgrounds from "@storybook/addon-backgrounds";

import { Welcome } from "@storybook/react/demo";
import FoodQuantityDisplay from "../components/FoodQuantityDisplay";
import Button from "../components/Button";
import LoginPage from "../components/pages/LoginPage";

import FontAwesome from "react-fontawesome";
import { COLOR } from "../components/Variables";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .addDecorator(
    backgrounds([
      { name: "Primary Confido", value: COLOR.primaryConfido, default: true },
      { name: "Secondary Confido", value: COLOR.secondaryConfido }
    ])
  )
  .add("Default", () => <Button />)
  .add("Basic Button", () => (
    <div>
      <Button text="Primary" />
      <Button text="Secondary" color={COLOR.cherry} />
    </div>
  ))
  .add("Outline Button", () => (
    <div>
      <Button text="Primary" outline />
      <Button text="Secondary" color={COLOR.cherry} outline />
    </div>
  ))
  .add("Size", () => (
    <div>
      <Button text="1 rem" fontSize="1rem" />
      <Button text="1.5 rem" fontSize="1.5rem" />
      <Button text="2 rem" fontSize="2rem" />
      <Button text="2.5 rem" fontSize="2.5rem" />
    </div>
  ))
  .add("Disabled", () => (
    <div>
      <Button text="Disabled" disabled />
      <Button text="Disabled" color={COLOR.cherry} disabled />
    </div>
  ));

storiesOf("Food Quantity Display", module)
  .addDecorator(
    backgrounds([
      { name: "Primary Confido", value: COLOR.primaryConfido, default: true },
      { name: "Secondary Confido", value: COLOR.secondaryConfido }
    ])
  )
  .add("Default", () => <FoodQuantityDisplay />)
  .add("Quantity State", () => (
    <div>
      <FoodQuantityDisplay currentQuantity={25} maxQuantity={100} />
      <FoodQuantityDisplay currentQuantity={75} maxQuantity={100} />
      <FoodQuantityDisplay currentQuantity={100} maxQuantity={100} />
    </div>
  ));

storiesOf("LoginPage", module).add("Default", () => <LoginPage />);
