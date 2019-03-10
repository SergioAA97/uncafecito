import React, {Component} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {UserContext} from './Context/user-context';

class PrivateRoute extends Component {
  render() {

    const isLoggedIn = this.context.isLoggedIn();
    const {component: Component, ...rest} = this.props;
    return (
        <Route
        {...rest}
        render={props =>
            isLoggedIn ? (
            <Component {...props} />
            ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        }
        />
    )
  }
}
/*
const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
   return (
    <UserContext.Consumer>
        { value => 
            <Route
            {...rest}
            render={props =>
                value.isLoggedIn ? (
                <Component {...props} />
                ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
            }
            />
        }
    </UserContext.Consumer>
  )
}
*/

PrivateRoute.contextType = UserContext;
export default PrivateRoute