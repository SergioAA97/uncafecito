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
import { groupQueryURL } from "../Api";
import Validator from "validator";

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

  onChange = e => {
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
      input
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { input } = this.state;

    if (Validator.isEmpty(input)) return;
    if (!Validator.isAlphanumeric(input)) return;

    let noEspaces = input.replace(/ /g, "");

    const url = groupQueryURL(noEspaces);

    this.setState({
      loading: true
    });

    Axios.get(url)
      .then(res => {
        if (res.status === 200) {
          if (
            Array.isArray(res.data) &&
            res.data.length > 0 &&
            res.data[0].hasOwnProperty("TOTAL")
          ) {
            //Group found, redirect
            const result = res.data[0].TOTAL;
            if (typeof result === "number" && result > 0) {
              this.setState({
                redirect: {
                  path: `${input}`,
                  value: true
                },
                loading: false
              });
            } else {
              //No group found, create one
              this.setState({
                groupNotFound: true,
                loading: false
              });
            }
          }
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.status === 503) {
          console.log("Service Unavailable");
        }
      });
  };

  createGroup = () => {
    this.setState({ redirect: { value: true, path: this.state.input } });
  };

  componentWillUnmount() {
    document.body.style = "background: #fff;";
  }

  render() {
    const { redirect, loading, groupNotFound } = this.state;

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
              lg={{ size: "6", offset: "3" }}
            >
              <i className="fas fa-coffee fa-7x block mt-4 mb-2" />
              <h4 className="mb-4">Un Cafecito</h4>
              {/*<hr style={{ borderTop: "1px solid rgba(255,255,255,.5)" }} />*/}
              <Form className="pl-4 pr-4 text-left" onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="groupInput">Nombre del grupo del café:</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      onChange={this.onChange}
                      placeholder="LosDelParque..."
                    />

                    <InputGroupAddon addonType="append">
                      <LoginButton
                        loading={loading}
                        groupNotFound={groupNotFound}
                      />
                    </InputGroupAddon>
                  </InputGroup>
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

const LoginButton = ({ loading, groupNotFound }) => {
  let content = "Entrar";
  let color = "secondary";
  if (loading) content = <i className="fas fa-sync fa-spin" />;
  if (groupNotFound) {
    content = <i className="fas fa-times fa-lg " color="white" />;
    color = "danger";
  }

  return (
    <Button color={color} disabled={groupNotFound}>
      {content}
    </Button>
  );
};

export default Login;
