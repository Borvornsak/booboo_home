import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import backgrounds from "@storybook/addon-backgrounds";

import { Button, Welcome } from "@storybook/react/demo";
import FoodQuantityDisplay from "../components/FoodQuantityDisplay";

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
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
  ));

