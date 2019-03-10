import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Form,
  Label,
  FormGroup
} from "reactstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { getGroupQueryURL, createGroupQueryURL } from "../Api";
import Validator from "validator";
import {UserContext} from "../Context/user-context";

export class Login extends Component {
  state = {
    input: "",
    redirect: {
      path: "",
      value: false
    },
    loading: false,
    groupNotFound: false
  };

  onChange= name => e => {
    let input = e.target.value;

    if (!Validator.isAlphanumeric(input)) {
      e.target.value = input.replace(/\W/g, "");
      return;
    }
    if (!Validator.isLength(input, { max: 30 })) {
      e.target.value = input.slice(0, 30);
      return;
    }

    this.setState({
      [name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.getGroup(this.state.groupName,this.state.username);
  };

  getGroup = (groupName, username) => {

    if (Validator.isEmpty(groupName)) return;
    if (!Validator.isAlphanumeric(groupName)) return;
    if (Validator.isEmpty(username)) return;
    if (!Validator.isAlphanumeric(username)) return;

    groupName = groupName.replace(/ /g, "");

    //const url = groupQueryURL(noEspaces);
    const url = getGroupQueryURL();
    this.setState({
      loading: true,
      groupNotFound: false
    });

      Axios.get(url, { params: { secret: 'uncafecitosecret', cohorte : groupName, username: username } })
      .then(res => {
        if (res.status === 200) {
          // Decode response
          const {cohorteFound, usernameFound, result} = res.data;
          if (cohorteFound) {
            //Group found, redirect
              let { setUserData } = this.context;
              setUserData(result, username);

              this.setState({
                redirect: {
                  path: `${groupName}`,
                  value: true
                },
                loading: false
              });
          }
          else {
            //No group found, create one
            this.setState({
              groupNotFound: true,
              loading: false
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
        if (err.status === 503) {
          console.log("Service Unavailable");
        }
      });
  }

  createGroup = () => {
    const { groupName } = this.state;
    const url = createGroupQueryURL();
    this.setState({
      loading: true
    });

      Axios.post(url)
      .then(res => {
        if (res.status === 200) {
          // Decode response
          const group = res;

          if (group) {
            //Group found, redirect
            
              this.setState({
                redirect: {
                  path: `${groupName}`,
                  value: true
                },
                loading: false
              });
          }
          else {
            //No group found, create one
            this.setState({
              groupNotFound: true,
              loading: false
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
        if (err.status === 503) {
          console.log("Service Unavailable");
        }
      });
  };

  componentWillUnmount() {
    document.body.style = "background: #fff;";
  }

  render() {
    const { redirect, loading, groupNotFound } = this.state;

    let storedCohorte , storedUsername;
    
    //Check localstorage for credentials
    if(typeof(Storage) !== 'undefined' && !loading){
      storedCohorte = localStorage.getItem('cohorte');
      storedUsername = localStorage.getItem('username');
      if(storedCohorte && storedUsername) {
        this.getGroup(storedCohorte, storedUsername);
      }
    }
    

    //Change Background color
    document.body.style =
      "background-image: linear-gradient(45deg, #1A1F24,#343A40); height: 100%; background-size: cover; background-attachment: fixed";

    if (redirect.value) return <Redirect to={this.state.redirect.path} push />;

    return (
      <div className="text-center pb-4 pt-4" style={{ color: "white" }}>
        <Container>
          <Row>
            <Col
              xs="12"
              md={{ size: "8", offset: "2" }}
              lg={{ size: "4", offset: "4" }}
            >
              <i className="fas fa-coffee fa-7x block mt-4 mb-2" />
              <h4 className="mb-4">Un Cafecito</h4>
              {/*<hr style={{ borderTop: "1px solid rgba(255,255,255,.5)" }} />*/}
              <Form className="pl-4 pr-4 text-left" onSubmit={this.onSubmit}>
                <FormGroup>
                    <Input
                      type="text"
                      onChange={this.onChange('groupName')}
                      style={{marginBottom: '1rem'}}
                      placeholder={"Nombre del grupo"}
                    />
                    <Input
                      type="text"
                      onChange={this.onChange('username')}
                      style={{marginBottom: '1rem'}}
                      placeholder={"Nombre de usuario"}
                    />
                  <LoginButton
                    loading={loading}
                    groupNotFound={groupNotFound}
                  />
                  {groupNotFound &&
                    !loading && (
                      <div className="mt-2">
                        <p>
                          El grupo no existe, utiliza el botón "Crear" para
                          crearlo.
                        </p>
                        <Button
                          color="success"
                          block
                          onClick={this.createGroup}
                        >
                          Crear
                        </Button>
                      </div>
                    )}
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        <CopyRight />
      </div>
    );
  }
}

const CopyRight = () => (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: "2rem",
      color: "white"
    }}
  >
    Sergio Alba Alcalde - Rafael Alba Cascales{" "}
    <i className="far fa-copyright" /> 2018
  </div>
);

const LoginButton = ({ loading, groupNotFound, onClick }) => {
  let content = "Entrar";
  let color = "secondary";
  if (loading) content = <i className="fas fa-sync fa-spin" />;
  if (groupNotFound) {
    content = <i className="fas fa-redo " color="white" />;
    color = "primary";
  }
  return (
    <Button block type="submit" color={color} onClick={onClick}>
      {content}
    </Button>
  );
};

Login.contextType = UserContext;
export default Login;
