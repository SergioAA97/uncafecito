import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { elementsQueryURL } from "../Api";
import AddOrder from "../AddOrder/AddOrder";
import Axios from "axios";
import { FormatDate } from "../DateFormat";
import Validator from "validator";

export default class Listview extends Component {
  state = {
    selectedGroup: this.props.match.params.group,
    list: [],
    loaded: false
  };

  componentDidMount() {
    this.fetchList();
  }
  fetchList = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    const day = currentDate.getDate().toString();
    const date = FormatDate(year, month, day);
    console.log("Date for fetched data:", date);

    if (
      typeof this.state.selectedGroup !== "string" ||
      this.state.selectedGroup === "undefined"
    ) {
      console.log("Error with selectedGroup");
      return;
    }

    const url = elementsQueryURL(this.state.selectedGroup, date);

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
        console.log("Error while fetching data", err);
      });
  };

  render() {
    const { list } = this.state;

    let content;

    if (Array.isArray(list) && list.length) {
      content = (
        <Col xs="12" className="mt-4">
          <Row>
            <ListGroup name="Bebidas">
              {list.map((item, index) => {
                const { Bebida, ObsBebida, Nombre } = item;
                return (
                  <ListItem
                    key={`${index}Bebida`}
                    name={Nombre}
                    value={Bebida}
                    obs={ObsBebida}
                  />
                );
              })}
            </ListGroup>
            <ListGroup name="Comidas">
              {list.map((item, index) => {
                const { Comida, ObsComida, Nombre } = item;
                if (!Comida || Validator.isEmpty(Comida.toString())) {
                  return <React.Fragment key={`DefaultKey${index}`} />;
                }
                return (
                  <ListItem
                    key={`${index}Comida`}
                    name={Nombre}
                    value={Comida}
                    obs={ObsComida}
                  />
                );
              })}
            </ListGroup>
          </Row>
        </Col>
      );
    } else if (this.state.loaded) {
      content = (
        <Col
          xs="12"
          className="text-center mt-4"
          style={{ color: "#91919280" }}
        >
          <i className="fas fa-file-excel block fa-7x mt-4 mb-3" />
          <h5>La lista esta vacia...</h5>
          <h4>Añade algo!</h4>
          <i className="fas fa-arrow-down block fa-7x mt-4 mb-3" />
        </Col>
      );
    } else {
      content = (
        <Col
          xs="12"
          className="text-center mt-4"
          style={{ color: "#91919280" }}
        >
          <h3>Cargando...</h3>
          <i className="fas fa-cog fa-7x block fa-spin mt-4" />
        </Col>
      );
    }

    return (
      <React.Fragment>
        {content}
        <AddOrder fetchList={this.fetchList} group={this.state.selectedGroup} />
      </React.Fragment>
    );
  }
}

const ListGroup = ({ name, children }) => {
  if (children) {
    //style={{ borderLeft: "2px solid #a7a8a9" }}
    return (
      <Col xs="12" md={{ size: "8", offset: "2" }} className="mb-4">
        <h3 className="font-weight-normal pl-1">{name}</h3>
        <div>{children}</div>
      </Col>
    );
  } else {
    return <React.Fragment />;
  }
};

const ListItem = ({
  name = "Manuel",
  value = "Cafe con leche",
  obs = "Some obs"
}) => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-grow-1 mt-1 mb-1 pl-4 pr-4">
        <div className="flex-grow-1" style={{ fontSize: "1.2rem" }}>
          {value}
        </div>
        {name && <div className="text-muted align-self-end">de {name}</div>}
      </div>
      {obs && <div className="ml-4 pl-4 text-muted">{obs}</div>}
    </div>
  );
};
