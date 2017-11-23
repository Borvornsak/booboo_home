import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import backgrounds from "@storybook/addon-backgrounds";

import { Welcome } from "@storybook/react/demo";
import FoodQuantityDisplay from "../components/FoodQuantityDisplay";
import Button from "../components/Button";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .addDecorator(
    backgrounds([
      { name: "Primary Confido", value: "#535067", default: true },
      { name: "Secondary Confido", value: "#454254" }
    ])
  )
  .add("Default", () => <Button />)
  .add("Basic Button", () => (
    <div>
      <Button text="Primary" />
      <Button text="Secondary" color="#e28d8a" />
    </div>
  ))
  .add("Outline Button", () => (
    <div>
      <Button text="Primary" outline />
      <Button text="Secondary" color="#e28d8a" outline />
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
      <Button text="Disabled" color="#e28d8a" disabled />
    </div>
  ));

