import React, { Component } from "react";
import { Col } from "reactstrap";
import { elementsQueryURL } from "../Api";
import Axios from "axios";

export default class Listview extends Component {
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
    const date = `${year}${month}${day}`;
    console.log(date);

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
        console.log(err);
      });
  }

  render() {
    const { list } = this.props;

    if (Array.isArray(list) && list.length) {
      return (
        <Col xs="12">
          <h3>
            Lista de Prado28 del:{" "}
            <span className="text-muted">{list[0].Fecha}</span>
          </h3>
        </Col>
      );
    } else {
      return (
        <Col
          xs="12"
          className="text-center mt-4"
          style={{ color: "#91919280" }}
        >
          <i className="fas fa-file-excel block fa-7x mt-4 mb-3" />
          <h5>La lista esta vacia...</h5>
          <h4>Añade algo!</h4>
        </Col>
      );
    }
  }
}
