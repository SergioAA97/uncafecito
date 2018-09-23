import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import NavigationBar from "./Navbar/NavigationBar";
import { elementsQueyURL } from "./Api";
import Axios from "axios";

class App extends Component {
  state = {
    selectedGroup: "Prado28",
    list: [],
    loaded: false
  };

  componentDidMount() {
    const currentDate = new Date(2018, 9, 21);
    const year = currentDate.getFullYear().toString();

    let month = currentDate.getMonth();
    month = month < 10 ? `0${month.toString()}` : month;

    const day = currentDate.getDate().toString();
    const date = `${year}/${month}/${day}`;
    console.log(date);

    const url = elementsQueyURL(this.state.selectedGroup, date);

    Axios.get(url)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          if (Array.isArray(res.data) && !res.data[0]) {
            console.log("Res came false", res);
            this.setState({
              loaded: true
            });
          }
          if (Array.isArray(res.data) && res.data[0]) {
            console.log("Res is not empty", res);
            this.setState({
              list: res.data,
              loaded: true
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <NavigationBar />
                  <Container />
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
