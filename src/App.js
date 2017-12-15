import React, { Component } from "react";
import LoginPage from "./components/pages/LoginPage";
<<<<<<< Updated upstream
import "antd/dist/antd.css";
=======
import FillFoodPage from "./components/pages/FillFoodPage";

>>>>>>> Stashed changes
class App extends Component {
  render() {
    return (
      <div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <FillFoodPage />
      </div>
    );
  }
}

export default App;
