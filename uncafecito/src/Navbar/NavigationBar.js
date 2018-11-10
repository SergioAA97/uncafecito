import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { withRouter } from "react-router-dom";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/uncafecito/">
            <i className="fas fa-coffee mr-2" />
            Un Cafecito
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
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
                  paddingRight: "0.5rem"
                }}
              >
                Grupo
              </div>
              <h5 style={{ color: "#fff", fontWeight: "400" }}>
                {this.props.match.params.group}
              </h5>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default (NavigationBar = withRouter(NavigationBar));
