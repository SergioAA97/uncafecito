import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Validator from "validator";
import Axios from "axios";
import { addOrderURL } from "../Api";
import { FormatDate } from "../DateFormat";
import { ThrowError } from "../Error";

const inputNames = {
  name: "name",
  drink: "drink",
  obsDrink: "drinkObservation",
  food: "food",
  obsFood: "foodObservation"
};

const orderInput = (name, value) => {
  return { [name]: value, invalid: false, hint: "" };
};

class AddOrder extends React.Component {
  constructor(props) {
    super(props);

    let initialOrderState = {};

    for (let key in inputNames) {
      if (inputNames.hasOwnProperty(key)) {
        initialOrderState = {
          ...initialOrderState,
          [inputNames[key]]: orderInput(inputNames[key], "")
        };
      }
    }

    this.state = {
      modal: false,
      order: initialOrderState
    };

    this.toggle = this.toggle.bind(this);
  }

  onChange = e => {
    e.persist();
    //console.log(e);

    this.setState(state => ({
      order: {
        ...state.order,
        [e.target.name]: orderInput(e.target.name, e.target.value)
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    let error = false;

    //Validate forms
    const { order } = this.state;
    let group = this.props.group;
    let name = order[inputNames.name][inputNames.name];
    let drink = order[inputNames.drink][inputNames.drink];
    let obsDrink = order[inputNames.obsDrink][inputNames.obsDrink];
    let food = order[inputNames.food][inputNames.food];
    let obsFood = order[inputNames.obsFood][inputNames.obsFood];

    if (typeof order !== "object") return;
    //Group validation
    if (
      Validator.isEmpty(group) ||
      !Validator.isLength(group, { min: 1, max: 30 })
    ) {
      ThrowError({ err: "Empty or invalid length string", label: "Group" });
      error = true;
    }
    //Name validation
    if (
      Validator.isEmpty(name) ||
      !Validator.isLength(name, { min: 2, max: 30 })
    ) {
      order[inputNames.name].invalid = true;
      order[inputNames.name].hint =
        "El nombre debe ser entre 2 y 30 caracteres";

      ThrowError({ err: "Empty or invalid length string", label: "Name" });
      error = true;
    }
    ///Drink validation
    if (
      Validator.isEmpty(drink) ||
      !Validator.isLength(drink, { min: 1, max: 30 })
    ) {
      order[inputNames.drink].invalid = true;
      order[inputNames.drink].hint =
        "La bebida no puede estar vacía, ni ser más larga de 30 caracteres";

      ThrowError({ err: "Empty or invalid length string", label: "Drink" });
      error = true;
    }
    ///Drink Observation validation
    if (!Validator.isLength(obsDrink, { min: 0, max: 128 })) {
      order[inputNames.obsDrink].invalid = true;
      order[inputNames.obsDrink].hint = "Máximo de 128 caracteres";
      ThrowError({ err: "Empty or invalid length string", label: "obsDrink" });
      error = true;
    }
    ///Food validation
    if (!Validator.isLength(food, { min: 0, max: 30 })) {
      order[inputNames.food].invalid = true;
      order[inputNames.food].hint = "Máximo de 30 caracteres";
      ThrowError({ err: "Empty or invalid length string", label: "Food" });
      error = true;
    }
    ///Food Observation validation
    if (!Validator.isLength(obsFood, { min: 0, max: 128 })) {
      order[inputNames.obsFood].invalid = true;
      order[inputNames.obsFood].hint = "Máximo de 128 caracteres";
      ThrowError({ err: "Empty or invalid length string", label: "ObsFood" });
      error = true;
    }
    if (error) {
      this.setState({ order: order });
      return;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateString = FormatDate(
      year.toString(),
      month.toString(),
      day.toString()
    );

    const url = addOrderURL({
      group: group,
      date: dateString,
      name: name,
      drink: drink,
      obsDrink: obsDrink,
      food: food,
      obsFood: obsFood
    });

    Axios.get(url)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const barStyle = {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem 1rem"
    };

    const { order } = this.state;

    return (
      <div style={barStyle}>
        <div className="d-flex flex-column">
          <Button outline color="success" onClick={this.toggle}>
            <i className="fas fa-plus d-block" />
          </Button>
          <p className="mb-0">Añadir Orden</p>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Añadir nueva orden</ModalHeader>
          <ModalBody>
            <Form>
              <FormItem
                label="Nombre *"
                type="text"
                name={inputNames.name}
                id="nameInput"
                placeholder="Ej: Manuel..."
                onChange={this.onChange}
                invalid={order[inputNames.name].invalid}
                hint={order[inputNames.name].hint}
              />
              <FormItem
                label="Bebida *"
                type="text"
                name={inputNames.drink}
                id="drinkInput"
                placeholder="Ej: Café con leche..."
                onChange={this.onChange}
                invalid={order[inputNames.drink].invalid}
                hint={order[inputNames.drink].hint}
              />
              <FormItem
                label="Observaciones sobre la bebida"
                type="textarea"
                name={inputNames.obsDrink}
                id="drinkObsInput"
                placeholder="Ej: Con leche desnatada..."
                onChange={this.onChange}
                invalid={order[inputNames.obsDrink].invalid}
                hint={order[inputNames.obsDrink].hint}
              />
              <FormItem
                label="Comida"
                type="text"
                name={inputNames.food}
                id="foodInput"
                placeholder="Ej: Tostada de jamón..."
                onChange={this.onChange}
                invalid={order[inputNames.food].invalid}
                hint={order[inputNames.food].hint}
              />
              <FormItem
                label="Observaciones sobre la comida"
                type="textarea"
                name={inputNames.obsFood}
                id="foodObsInput"
                placeholder="Ej: Sólo con aceite de oliva..."
                onChange={this.onChange}
                invalid={order[inputNames.obsFood].invalid}
                hint={order[inputNames.obsFood].hint}
              />

              <p className="text-muted text-right small">
                Los campos marcados con * son obligatorios.
              </p>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>
              Confirmar
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const FormItem = ({
  label,
  placeholder,
  type,
  name,
  id,
  onChange,
  invalid = false,
  hint
}) => (
  <FormGroup>
    <Label for="foodObsInput">{label}</Label>
    <Input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      invalid={invalid}
    />
    {hint && <p className="mb-0 pl-1 pt-1 text-danger">{hint}</p>}
  </FormGroup>
);

export default AddOrder;
