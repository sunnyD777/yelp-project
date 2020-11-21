import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { signUp, nameChangeHandler, emailChangeHandler, passwordChangeHandler, locationChangeHandler, roleChangeHandler } from '../actions/actions';

class Signup extends Component {
  signUp = (e) => {
    e.preventDefault();
    const { role, name, email, password, location } = this.props;
    axios.post('/signup', { role, name, email, password, location })
      .then((response) => {
        delete response.data.password;
        const { _id } = response.data;
        this.props.signUp(response.data, _id, this.props.role);
        console.log(response.data);
      });
  }

  render() {
    const { role, name, email, location, password } = this.props;
    const formInputs = role === 'Customer' ? [
      <label htmlFor="inputUsername" className="sr-only">Username</label>,
      <input onChange={this.props.nameChangeHandler} value={name} type="username" name="username" className="form-control mb-3" placeholder="Username" required autoFocus />,
      <label htmlFor="inputEmail" className="sr-only">Email address</label>,
      <input onChange={this.props.emailChangeHandler} value={email} type="email" name="email" className="form-control mb-3" placeholder="Email address" required autoFocus />,
      <label htmlFor="inputPassword" className="sr-only">Password</label>,
      <input onChange={this.props.passwordChangeHandler} value={password} type="password" name="password" className="form-control mb-3" placeholder="Password" required />,
    // <label htmlFor="inputPassword2" className="sr-only">Password</label>,
    // <input type="password" name="password2" className="form-control mb-3" placeholder="Repeat Password" required />,
    ] : [
      <label htmlFor="inputRestaurantName" className="sr-only">Restaurant Name</label>,
      <input onChange={this.props.nameChangeHandler} value={name} type="username" name="restaurantName" className="form-control mb-3" placeholder="Restaurant Name" required autoFocus />,
      <label htmlFor="inputEmail" className="sr-only">Email address</label>,
      <input onChange={this.props.emailChangeHandler} value={email} type="email" name="email" className="form-control mb-3" placeholder="Email address" required autoFocus />,
      <label htmlFor="restaurantLocation" className="sr-only">Restaurant Location</label>,
      <input onChange={this.props.locationChangeHandler} value={location} type="text" name="restaurantLocation" className="form-control mb-3" placeholder="Restaurant Location" required />,
      <label htmlFor="inputPassword" className="sr-only">Password</label>,
      <input onChange={this.props.passwordChangeHandler} value={password} type="password" name="password" className="form-control mb-3" placeholder="Password" required />,
    // <label htmlFor="inputPassword2" className="sr-only">Password</label>,
    // <input type="password" name="password2" className="form-control mb-3" placeholder="Repeat Password" required />,
    ];
    return (
      <div>
        <form onSubmit={this.signUp} className="form-signin">
          <h2 className="mb-4 title">{`${role} Sign Up`}</h2>
          <h1 className="h3 mb-3 font-weight-normal signin">Sign up as</h1>
          <select onChange={this.props.roleChangeHandler} id="options">
            <option value="Customer">Customer</option>
            <option value="Restaurant">Restaurant</option>
          </select>
          {formInputs}
          <button className="btn btn-lg btn-success btn-block" type="submit">Register</button>
          <h1 className="h6 mt-3 ">Already registered?</h1>
          <a className="btn btn-lg btn-primary btn-block" href="/">Sign in</a>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    name: state.name,
    email: state.email,
    password: state.password,
    location: state.location,
    role: state.role
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user, id, role) => dispatch(signUp(user, id, role)),
    nameChangeHandler: (e) => dispatch(nameChangeHandler(e)),
    emailChangeHandler: (e) => dispatch(emailChangeHandler(e)),
    passwordChangeHandler: (e) => dispatch(passwordChangeHandler(e)),
    locationChangeHandler: (e) => dispatch(locationChangeHandler(e)),
    roleChangeHandler: (e) => dispatch(roleChangeHandler(e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
