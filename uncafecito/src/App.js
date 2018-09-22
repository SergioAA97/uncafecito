import React, { Component } from "react";

import NavigationBar from "./Navbar/NavigationBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <div className="container" />
      </div>
    );
  }
}

export default App;
