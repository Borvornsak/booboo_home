import React, { Component } from "react";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import "antd/dist/antd.css";
class App extends Component {
  state = { pages: "login" };
  handleLogin = () => {
    this.setState({ pages: "dashboard" });
  };
  handleLogout = () => {
    this.setState({ pages: "login" });
  };
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
        {this.state.pages === "login" && (
          <LoginPage onLogin={this.handleLogin} />
        )}
        {this.state.pages === "dashboard" && (
          <DashboardPage onLogout={this.handleLogout} />
        )}
      </div>
    );
  }
}

export default App;
