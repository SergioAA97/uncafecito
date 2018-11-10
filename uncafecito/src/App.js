import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row } from "reactstrap";

import NavigationBar from "./Navbar/NavigationBar";
import Listview from "./ListView/Listview";
import Login from "./Login/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/:group"
              render={props => (
                <React.Fragment>
                  <NavigationBar />
                  <Container>
                    <Row>
                      <Listview {...props} />
                    </Row>
                  </Container>
                </React.Fragment>
              )}
            />
            <Route
              render={props => (
                <React.Fragment>
                  <NavigationBar />
                  <Container className="text-center">
                    <h3>404 Not Found</h3>
                  </Container>
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
