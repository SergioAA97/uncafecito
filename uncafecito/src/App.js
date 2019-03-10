import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row } from "reactstrap";

import NavigationBar from "./Navbar/NavigationBar";
import Listview from "./ListView/Listview";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute";

import {UserContext, data} from './Context/user-context';
import { type } from "os";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {...data},
      setUserData: this.setUserData,
      isLoggedIn: this.isLoggedIn
    };
  }
  
  setUserData = (group, username) => {
    //Local storage option to retain info about user
    if(typeof(Storage) !== 'undefined'){
      localStorage.setItem('cohorte',group.cohorte);
      localStorage.setItem('username',username);
    }

    this.setState({
      data: {
        group: {...group},
        user: {
          username
        }
      }
    });
  }

  isLoggedIn = () => {
    const {group, user} = this.state.data;
    return (group.cohorte !== "" && user.username != "");
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute
              exact
              path="/:group"
              component={Dashboard}
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
      </UserContext.Provider>
    );
  }
}

const Dashboard = (props) => {
  return (
    <React.Fragment>
                  <NavigationBar />
                  <Container>
                    <Row>
                      <Listview {...props} />
                    </Row>
                  </Container>
                </React.Fragment>
  )
}

export default App;
