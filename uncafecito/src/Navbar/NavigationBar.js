import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  NavLink
} from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from '../Context/user-context';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      signOut: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  signOut = () => {
    if(typeof(Storage) !== 'undefined'){
      localStorage.setItem('cohorte',"");
      localStorage.setItem('username',"");
    }
    this.setState({
      signOut: true
    })
  }

  render() {
    if(this.state.signOut){
      return <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
    }else{
      return (
        <UserContext.Consumer>
          { value =>
            <div>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">
                <i className="fas fa-coffee mr-2" />
                Un Cafecito
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-2 mt-1" navbar>
                  <h5 style={{ color: "#fff", fontWeight: "300" }}>
                    {new Date().toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </h5>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <div
                    style={{
                      color: "#b9b9b9",
                      fontSize: "1rem",
                      alignSelf: "center",
                      paddingRight: "0.5rem",
                    }}
                  >
                    Grupo
                  </div>
                  <h5 style={{ color: "#fff", fontWeight: "400" }}>
                    {this.props.match.params.group}
                  </h5>
                </Nav>
                <Nav className="ml-3" navbar>
                  <div
                    style={{
                      color: "#b9b9b9",
                      fontSize: "1rem",
                      alignSelf: "center",
                      paddingRight: "0.5rem"
                    }}
                  >
                    Nombre
                  </div>
                  <h5 style={{ color: "#fff", fontWeight: "400" }}>
                    {value.data.user.username}
                  </h5>
                </Nav>
                <Nav className="ml-3" navbar>
                  <Button onClick={this.signOut}>
                    Salir
                    <i className="fas fa-times-circle ml-2" />
                  </Button>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          }
        
        </UserContext.Consumer>
      );
    }
  }
}
export default (NavigationBar = withRouter(NavigationBar));
