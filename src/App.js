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
        {/* {this.state.pages === "login" && (
          <LoginPage onLogin={this.handleLogin} />
        )}
        {this.state.pages === "dashboard" && (
          <DashboardPage onLogout={this.handleLogout} />
        )} */}
        <DashboardPage />
      </div>
    );
  }
}

export default App;
